import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cburpyzmvdgypjjdpoup.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNidXJweXptdmRneXBqamRwb3VwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNzA3ODIwNCwiZXhwIjoyMDIyNjU0MjA0fQ.Hs_Hy_Hy_Hy_Hy_Hy_Hy_Hy_Hy_Hy_Hy_Hy_Hy_Hy_Hy";

export const supabaseAdmin = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
); 