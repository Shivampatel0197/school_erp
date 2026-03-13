const { Client } = require('pg');
require('dotenv').config({ path: '.env.local' });

async function fixRLS() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to DB');

    console.log('Adding RLS policy for schools...');
    await client.query(`
      DROP POLICY IF EXISTS "Allow public read access" ON schools;
      CREATE POLICY "Allow public read access" ON schools FOR SELECT USING (true);
    `);
    
    console.log('Adding RLS policy for students/teachers to allow insert for now...');
    // In a real app, these would be more restrictive.
    await client.query(`
      DROP POLICY IF EXISTS "Allow public insert access" ON students;
      CREATE POLICY "Allow public insert access" ON students FOR INSERT WITH CHECK (true);
      
      DROP POLICY IF EXISTS "Allow public read access" ON students;
      CREATE POLICY "Allow public read access" ON students FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Allow public insert access" ON teachers;
      CREATE POLICY "Allow public insert access" ON teachers FOR INSERT WITH CHECK (true);
      
      DROP POLICY IF EXISTS "Allow public read access" ON teachers;
      CREATE POLICY "Allow public read access" ON teachers FOR SELECT USING (true);
    `);

    console.log('RLS policies updated!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.end();
  }
}

fixRLS();
