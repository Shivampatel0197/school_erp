const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });
// fallback to env.example if .env.local doesn't exist
if (!process.env.DATABASE_URL) {
  require('dotenv').config({ path: 'env.example' });
}

async function setupDB() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to DB');

    // 1. Create a default school if none exists
    const res = await client.query(`SELECT id FROM schools LIMIT 1`);
    let schoolId;
    if (res.rowCount === 0) {
      const insertRes = await client.query(`INSERT INTO schools (name) VALUES ('Default School') RETURNING id`);
      schoolId = insertRes.rows[0].id;
      console.log('Created Default School with ID:', schoolId);
    } else {
      schoolId = res.rows[0].id;
      console.log('Found existing school:', schoolId);
    }

    // 2. Add simple fields to teachers table for UI compatibility
    console.log('Altering teachers table...');
    await client.query(`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS name VARCHAR(255);`);
    await client.query(`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS email VARCHAR(255);`);
    await client.query(`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS subjects VARCHAR(255);`);
    await client.query(`ALTER TABLE teachers ADD COLUMN IF NOT EXISTS classes VARCHAR(255);`);

    // 3. Add simple fields to students table for UI compatibility
    console.log('Altering students table...');
    await client.query(`ALTER TABLE students ADD COLUMN IF NOT EXISTS full_name VARCHAR(255);`);
    await client.query(`ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_name VARCHAR(255);`);
    await client.query(`ALTER TABLE students ADD COLUMN IF NOT EXISTS class_name VARCHAR(255);`);

    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

setupDB();
