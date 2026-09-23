import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Read from Vite environment variables (with live SVCE project fallback)
const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  import.meta.env.SUPABASE_URL || 
  'https://jyemhebaheytkqomsfcy.supabase.co';

const supabaseKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  import.meta.env.SUPABASE_ANON_KEY || 
  import.meta.env.SUPABASE_PUBLISHABLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5ZW1oZWJhaGV5dGtxb21zZmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5ODU0NjksImV4cCI6MjEwNTU2MTQ2OX0.y8oD3o-pM5MGzr_p8MazYOG5AF517rLjPeXmA2-JkvU';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseKey) &&
    !supabaseUrl.includes('YOUR_PROJECT_ID')
  );
};

let client: SupabaseClient | null = null;

if (isSupabaseConfigured()) {
  try {
    client = createClient(supabaseUrl, supabaseKey);
  } catch (error) {
    console.warn('Failed to initialize Supabase client:', error);
  }
}

export const supabase = client;
export const supabaseAnonKey = supabaseKey;
export { supabaseUrl, supabaseKey };

export interface AdminAuthResult {
  success: boolean;
  message?: string;
  user?: {
    email: string;
    role?: string;
    name?: string;
    id?: string;
  };
}

/**
 * Authenticates admin credentials directly against the Supabase database.
 * 1. Checks Supabase PostgreSQL `admin_users` table.
 * 2. Checks Supabase Auth service.
 * 3. Supports default fixed credentials (admin@svcoledu.net.in / svce@2013) with automatic database sync.
 */
export async function authenticateAdmin(email: string, password: string): Promise<AdminAuthResult> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassword = password.trim();

  // 1. Query Supabase PostgreSQL `admin_users` table
  if (supabase && isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (!error && data) {
        if (data.password === cleanPassword) {
          // Update last_login timestamp in Supabase
          try {
            await supabase
              .from('admin_users')
              .update({ last_login: new Date().toISOString() })
              .eq('email', cleanEmail);
          } catch (e) {
            console.warn('Could not update last_login timestamp:', e);
          }

          return {
            success: true,
            user: {
              id: data.id,
              email: data.email,
              name: data.name || 'SVCE Administrator',
              role: data.role || 'institutional_admin',
            },
            message: 'Authenticated via Supabase database table.',
          };
        } else {
          return {
            success: false,
            message: 'Incorrect password for registered administrator.',
          };
        }
      }
    } catch (dbErr) {
      console.warn('Note: public.admin_users table query notice:', dbErr);
    }

    // 2. Try Supabase Auth API
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPassword,
      });

      if (!authError && authData?.user) {
        return {
          success: true,
          user: {
            id: authData.user.id,
            email: authData.user.email || cleanEmail,
            role: 'authenticated_admin',
          },
          message: 'Authenticated via Supabase Auth service.',
        };
      }
    } catch {
      // Continue to fixed credential fallback
    }
  }

  // 3. Official Fixed Administrator Credential Match
  if (cleanEmail === 'admin@svcoledu.net.in' && cleanPassword === 'svce@2013') {
    // If Supabase is connected, automatically sync/store this user into `admin_users` table
    if (supabase && isSupabaseConfigured()) {
      try {
        await supabase.from('admin_users').upsert({
          email: 'admin@svcoledu.net.in',
          password: 'svce@2013',
          name: 'SVCE Administrator',
          role: 'institutional_admin',
          last_login: new Date().toISOString(),
        }, { onConflict: 'email' });
      } catch (upsertErr) {
        console.warn('Database auto-provision notice:', upsertErr);
      }
    }

    return {
      success: true,
      user: {
        email: 'admin@svcoledu.net.in',
        name: 'SVCE Administrator',
        role: 'institutional_admin',
      },
      message: 'Authenticated as SVCE Institutional Administrator.',
    };
  }

  return {
    success: false,
    message: 'Invalid Admin credentials. Please verify your Email and Password.',
  };
}
