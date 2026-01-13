import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
    const errorMessage = 'Missing Supabase credentials. Please check your environment variables.';

    if (import.meta.env.PROD) {
        // In production, throw an error to prevent the app from running with invalid config
        throw new Error(errorMessage);
    } else {
        // In development, just warn
        console.warn(errorMessage);
        console.warn('Please ensure PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY are set in your .env file');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
