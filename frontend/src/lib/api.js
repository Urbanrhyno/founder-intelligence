import { supabase } from "./supabase"

/**
 * Fetch top articles for a category from the last 24 hours, ordered by score then recency.
 * @param {string} category - funding | founder_stories | ai | scalable_business
 * @param {number} limit
 */
export async function fetchArticles(category, limit = 5) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  let query = supabase
    .from("articles")
    .select("*")
    .gte("published_at", twentyFourHoursAgo)
    .not("score", "is", null)
    .order("score", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(limit)

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error(error)
    return []
  }

  return data || []
}
