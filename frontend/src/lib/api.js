import { supabase } from "./supabase"

export async function fetchArticles(category, limit = 5) {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}