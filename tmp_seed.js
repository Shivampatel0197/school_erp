const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedSchool() {
  console.log('Checking for schools...');
  const { data, error } = await supabase.from('schools').select('id').limit(1);
  
  if (error) {
    console.error('Error fetching schools:', error);
    return;
  }

  if (data && data.length > 0) {
    console.log('School already exists:', data[0].id);
  } else {
    console.log('No schools found. Inserting default school...');
    const { data: newData, error: insertError } = await supabase
      .from('schools')
      .insert([{ name: 'Main Academy', address: '123 School Street', contact_email: 'admin@school.com' }])
      .select();

    if (insertError) {
      console.error('Error inserting school:', insertError);
    } else {
      console.log('Default school created:', newData[0].id);
    }
  }
}

seedSchool();
