import initSqlJs from 'sql.js';

let db;

export async function initDatabase() {
  const SQL = await initSqlJs();
  db = new SQL.Database();
  // Create a table for nodes
  db.run(`
    CREATE TABLE IF NOT EXISTS nodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      positionName TEXT,
      phone TEXT,
      email TEXT,
      department TEXT,
      imageUrl TEXT,
      address TEXT,
      positionCode TEXT
    );
  `);
}

export function getNodeData(id) {
  if (!db) {
    console.warn("Database not initialized yet.");
    return {};
  }
  try {
    const stmt = db.prepare('SELECT * FROM nodes WHERE id = ?');
    stmt.bind([id]);
    const result = stmt.getAsObject();
    stmt.free();
    return result;
  } catch (e) {
    console.error("getNodeData error:", e);
    return {};
  }
}

export function saveNodeData(nodeData) {
  if (!db) {
    console.warn("Database not initialized yet.");
    return;
  }
  try {
    const stmt = db.prepare(`
      INSERT INTO nodes (name, positionName, phone, email, department, imageUrl, address, positionCode)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run([
      nodeData.name,
      nodeData.positionName,
      nodeData.phone,
      nodeData.email,
      nodeData.department,
      nodeData.imageUrl,
      nodeData.address,
      nodeData.positionCode,
    ]);
    stmt.free();
  } catch (e) {
    console.error("saveNodeData error:", e);
  }
}