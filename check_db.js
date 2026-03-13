const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function checkColumns() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    const res = await client.query("SELECT table_name, column_name FROM information_schema.columns WHERE table_schema = 'public'");
    
    const tables = {};
    res.rows.forEach(row => {
      if (!tables[row.table_name]) tables[row.table_name] = [];
      tables[row.table_name].push(row.column_name);
    });
    
    console.log(JSON.stringify(tables, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

checkColumns();
