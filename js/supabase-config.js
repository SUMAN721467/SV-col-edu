/**
 * Swami Vibekananda College of Education - Supabase Client Configuration
 * Directly loads & parses the root .env file.
 */

window.SUPABASE_CONFIG = {
  url: 'https://jyemhebaheytkqomsfcy.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5ZW1oZWJhaGV5dGtxb21zZmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5ODU0NjksImV4cCI6MjEwNTU2MTQ2OX0.y8oD3o-pM5MGzr_p8MazYOG5AF517rLjPeXmA2-JkvU'
};

window.supabaseClient = null;

async function initSupabaseFromEnv() {
  try {
    const res = await fetch('.env');
    if (res.ok) {
      const text = await res.text();
      text.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#')) {
          const [key, ...values] = trimmed.split('=');
          if (key) {
            let val = values.join('=').trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            if (key.trim() === 'SUPABASE_URL') {
              window.SUPABASE_CONFIG.url = val;
            } else if (key.trim() === 'SUPABASE_ANON_KEY') {
              window.SUPABASE_CONFIG.anonKey = val;
            }
          }
        }
      });
    }
  } catch (e) {
    console.warn("Note: Fetching .env directly requires a web server (e.g. Live Server).", e);
  }

  // Initialize Supabase Client if library is present
  if (window.supabase && window.SUPABASE_CONFIG.url && !window.SUPABASE_CONFIG.url.includes('YOUR_PROJECT_ID')) {
    try {
      window.supabaseClient = window.supabase.createClient(window.SUPABASE_CONFIG.url, window.SUPABASE_CONFIG.anonKey);
    } catch (e) {
      console.warn("Supabase client init error:", e);
    }
  }
}

// Start loading .env immediately
window.envReady = initSupabaseFromEnv();
