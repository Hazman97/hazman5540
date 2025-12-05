import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ossqkmzqwztkalvfeocm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zc3FrbXpxd3p0a2FsdmZlb2NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ5MjU1ODksImV4cCI6MjA4MDUwMTU4OX0.n-9DxIc46JMvDU8raSE-TuXQ5qu6zEzeQS-yLnyC5kg";
export const supabase = createClient(supabaseUrl, supabaseKey);
