import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://grnvxpyuzwtljgjgsttb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdybnZ4cHl1end0bGpnamdzdHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM1ODQwNTgsImV4cCI6MjA4OTE2MDA1OH0.s-JoNB75-U-zqbLmdLMh8b29VZnRwF3QbwfvbTth3ro"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)