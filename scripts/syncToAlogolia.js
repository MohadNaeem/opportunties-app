require('dotenv').config();
const algoliasearch = require('algoliasearch');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Algolia client
const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
const index = client.initIndex('dev_oppurtunities');

async function syncDataToAlgolia() {
  // Fetch data from Supabase
  const { data, error } = await supabase.from('opportunities').select('*');
  if (error) {
    console.error('Error fetching data from Supabase:', error);
    return;
  }

  // Transform data to match Algolia's format
  const records = data.map(record => ({
    objectID: record.id,
    ...record,
  }));

  // Save records to Algolia
  try {
    await index.saveObjects(records);
    console.log('Data synced to Algolia successfully');
  } catch (error) {
    console.error('Error syncing data to Algolia:', error);
  }
}

// Run the sync function
syncDataToAlgolia().catch(console.error);
