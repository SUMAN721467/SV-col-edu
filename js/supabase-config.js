/**
 * Swami Vibekananda College of Education - Supabase Client Configuration
 * Directly loads & parses the root .env file.
 */

window.SUPABASE_CONFIG = {
  url: 'https://YOUR_PROJECT_ID.supabase.co',
  anonKey: 'YOUR_SUPABASE_ANON_KEY'
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
