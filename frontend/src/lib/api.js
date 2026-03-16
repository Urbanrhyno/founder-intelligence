import { supabase } from "./supabase"

const CATEGORY_KEYS = ["funding", "founder_stories", "ai", "scalable_business"]

/**
 * Single-query fetch for all homepage sections.
 * Returns a map from category -> top N articles from the last 24 hours.
 * @param {number} limitPerCategory
 * @returns {Promise<Record<string, any[]>>}
 */
export async function fetchAllArticlesForHome(limitPerCategory = 5) {
  const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .gte("published_at", twentyFourHoursAgo)
    .not("score", "is", null)
    .order("score", { ascending: false })
    .order("published_at", { ascending: false })

  if (error) {
    console.error(error)
    return {
      funding: [],
      founder_stories: [],
      ai: [],
      scalable_business: [],
    }
  }

  const byCategory = {
    funding: [],
    founder_stories: [],
    ai: [],
    scalable_business: [],
  }

  for (const article of data || []) {
    const cat = CATEGORY_KEYS.includes(article.category) ? article.category : null
    if (!cat) continue
    if (byCategory[cat].length < limitPerCategory) {
      byCategory[cat].push(article)
    }
  }

  return byCategory
}
