import { Hono } from 'hono'
import { D1Database } from '@cloudflare/workers-types'

export const financeRoutes = new Hono<{ Bindings: { DB: D1Database } }>()

// Helper to get or create default categories if missing
async function ensureCategories(db: D1Database) {
  const countRes = await db.prepare('SELECT COUNT(*) as count FROM finance_categories').first()
  if (countRes && countRes.count === 0) {
    const categories = [
      { name: 'Fuel', bucket: 'Grab' },
      { name: 'Tolls', bucket: 'Grab' },
      { name: 'Grab Fares', bucket: 'Grab' },
      { name: 'Primary Salary', bucket: 'Personal' },
      { name: 'Fixed Expenses', bucket: 'Personal' },
      { name: 'Variable Expenses', bucket: 'Personal' },
      { name: 'Date Nights', bucket: 'Shared' },
      { name: 'Joint Travel', bucket: 'Shared' },
      { name: 'Gifts', bucket: 'Shared' },
      { name: 'Wedding Fund Contribution', bucket: 'Shared' },
    ]
    const stmts = categories.map(c => 
      db.prepare('INSERT INTO finance_categories (name, bucket_type) VALUES (?, ?)').bind(c.name, c.bucket)
    )
    await db.batch(stmts)
  }
}

// Helper to get or create default wallets
async function ensureWallets(db: D1Database) {
  const countRes = await db.prepare('SELECT COUNT(*) as count FROM finance_wallets').first()
  if (countRes && countRes.count === 0) {
    await db.batch([
      db.prepare('INSERT INTO finance_wallets (name, target_amount, balance) VALUES (?, ?, ?)').bind('July 2026 Wedding Fund', 20000, 0),
      db.prepare('INSERT INTO finance_wallets (name, target_amount, balance) VALUES (?, ?, ?)').bind('Perodua Axia X Maintenance Fund', null, 0)
    ])
  }
}

// Ensure defaults on any request (simple bootstrap)
financeRoutes.use('*', async (c, next) => {
  await ensureCategories(c.env.DB)
  await ensureWallets(c.env.DB)
  await next()
})

// ── GET Summary (3 Buckets & Wallets) ──────────────────────
financeRoutes.get('/summary', async (c) => {
  try {
    const db = c.env.DB

    // Get wallets
    const walletsInfo = await db.prepare('SELECT * FROM finance_wallets').all()
    
    // Aggregate by bucket type
    const query = `
      SELECT c.bucket_type, t.transaction_type, SUM(t.amount) as total
      FROM finance_transactions t
      JOIN finance_categories c ON t.category_id = c.id
      GROUP BY c.bucket_type, t.transaction_type
    `
    const bucketsInfo = await db.prepare(query).all()

    return c.json({
      success: true,
      wallets: walletsInfo.results,
      buckets: bucketsInfo.results
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch summary' }, 500)
  }
})

// ── GET Categories ──────────────────────────────────────────
financeRoutes.get('/categories', async (c) => {
  try {
    const results = await c.env.DB.prepare('SELECT * FROM finance_categories ORDER BY bucket_type, name').all()
    return c.json({ success: true, categories: results.results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch categories' }, 500)
  }
})

// ── GET Transactions ────────────────────────────────────────
financeRoutes.get('/transactions', async (c) => {
  try {
    const results = await c.env.DB.prepare(`
      SELECT t.*, c.name as category_name, c.bucket_type 
      FROM finance_transactions t
      JOIN finance_categories c ON t.category_id = c.id
      ORDER BY t.date DESC, t.created_at DESC
      LIMIT 50
    `).all()
    return c.json({ success: true, transactions: results.results })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to fetch transactions' }, 500)
  }
})

// ── POST Standard Transaction ───────────────────────────────
financeRoutes.post('/transactions', async (c) => {
  try {
    const body = await c.req.json()
    const { amount, transaction_type, category_id, wallet_id, date, notes } = body
    
    if (!amount || !transaction_type || !category_id || !date) {
      return c.json({ success: false, error: 'Missing required fields' }, 400)
    }

    const db = c.env.DB

    // If wallet_id is provided, update the wallet balance
    if (wallet_id) {
      const modifier = transaction_type === 'income' ? amount : -amount
      await db.prepare('UPDATE finance_wallets SET balance = balance + ? WHERE id = ?').bind(modifier, wallet_id).run()
    }

    await db.prepare(`
      INSERT INTO finance_transactions (amount, transaction_type, category_id, wallet_id, date, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(amount, transaction_type, category_id, wallet_id || null, date, notes || '').run()

    return c.json({ success: true })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to add transaction' }, 500)
  }
})

// ── POST Grab Daily Calculator Logic ────────────────────────
financeRoutes.post('/grab-daily', async (c) => {
  try {
    const body = await c.req.json()
    const { gross, fuel, tolls, date, notes } = body

    if (gross == null || fuel == null || tolls == null || !date) {
      return c.json({ success: false, error: 'Missing Grab data' }, 400)
    }

    const db = c.env.DB

    // 1. Calculate True Daily Net Profit
    const netProfit = Number(gross) - Number(fuel) - Number(tolls)

    // 2. Calculate 10% Sinking Fund for Maintenance
    const maintenanceCut = netProfit > 0 ? netProfit * 0.10 : 0

    // 3. Get Category IDs
    const catsRes = await db.prepare('SELECT id, name FROM finance_categories WHERE bucket_type = "Grab"').all()
    const cats = catsRes.results as any[]
    
    const idFares = cats.find(c => c.name === 'Grab Fares')?.id
    const idFuel = cats.find(c => c.name === 'Fuel')?.id
    const idTolls = cats.find(c => c.name === 'Tolls')?.id

    // 4. Get Maintenance Wallet ID
    const walletRes = await db.prepare('SELECT id FROM finance_wallets WHERE name = "Perodua Axia X Maintenance Fund"').first()
    const walletId = walletRes?.id

    if (!idFares || !idFuel || !idTolls || !walletId) {
      return c.json({ success: false, error: 'System categories or wallets missing' }, 500)
    }

    // 5. Execute all inserts in a batch
    const stmts = [
      // Gross Fares Income
      db.prepare('INSERT INTO finance_transactions (amount, transaction_type, category_id, date, notes) VALUES (?, ?, ?, ?, ?)').bind(gross, 'income', idFares, date, notes || ''),
      // Fuel Expense
      db.prepare('INSERT INTO finance_transactions (amount, transaction_type, category_id, date, notes) VALUES (?, ?, ?, ?, ?)').bind(fuel, 'expense', idFuel, date, ''),
      // Tolls Expense
      db.prepare('INSERT INTO finance_transactions (amount, transaction_type, category_id, date, notes) VALUES (?, ?, ?, ?, ?)').bind(tolls, 'expense', idTolls, date, ''),
    ]

    // If net profit is positive, record the 10% deduction and update the wallet
    if (maintenanceCut > 0) {
      // Update wallet balance directly
      stmts.push(db.prepare('UPDATE finance_wallets SET balance = balance + ? WHERE id = ?').bind(maintenanceCut, walletId))
      
      // We also could log the maintenance transfer as a transaction, but updating the wallet is the main goal
    }

    await db.batch(stmts)

    return c.json({ 
      success: true, 
      netProfit, 
      maintenanceCut 
    })
  } catch (error) {
    return c.json({ success: false, error: 'Failed to process Grab daily' }, 500)
  }
})
