import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iagrrdvupcapyfnpkjvv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlhZ3JyZHZ1cGNhcHlmbnBranZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NjIzNTIsImV4cCI6MjA0NzAzODM1Mn0.qxPoexk0SyKbsPRjrSFksY0lG0clfDxsJIzlXQ5_YSY';
export const supabase = createClient(supabaseUrl, supabaseKey);
