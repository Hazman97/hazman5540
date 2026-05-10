const fs = require('fs');

let sql = '';
for (let i = 1; i <= 57; i++) {
  sql += `INSERT OR IGNORE INTO portfolio_visitors (ip_hash, last_visit) VALUES ('legacy_${i}', datetime('now'));\n`;
}

fs.writeFileSync('seed_visitors.sql', sql);
console.log('seed_visitors.sql generated with 57 records.');
