import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://efhjakexvwguprchetth.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmaGpha2V4dndndXByY2hldHRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEyODEzMjQsImV4cCI6MjA0Njg1NzMyNH0.O6Gh5X1SIJUlJon6KtNovI7Fsr9m5oLAe90cc9YEZLo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
