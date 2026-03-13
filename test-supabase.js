const { createClient } = require('@supabase/supabase-js');

try {
    console.log("Attempting to create client with undefined...");
    const supabase = createClient(undefined, undefined);
    console.log("Successfully created client (surprisingly)");
} catch (e) {
    console.log("Caught error:", e.message);
}
