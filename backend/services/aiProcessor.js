import 'dotenv/config'
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const CATEGORIES = ['funding', 'founder_stories', 'ai', 'scalable_business']

/**
 * Classify and score an article using a reasoning-style prompt. Returns strict JSON shape.
 * @param {string} title
 * @param {string} description
 * @param {{ source?: string, publishedAt?: Date }} [opts] - optional for recency and source credibility scoring
 * @returns {Promise<{ category: string, summary: string, score: number }>}
 */
export async function processArticle(title, description, opts = {}) {
  const { source = 'Unknown', publishedAt } = opts
  const ageHours = publishedAt
    ? Math.max(0, (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60))
    : 0

  const prompt = `You are a classifier and scorer for a startup founder news aggregator.

Consider these factors when scoring (0-100):
- Recency: newer articles score higher (article age: ~${Math.round(ageHours)} hours)
- Founder relevance: actionable for startup founders
- Startup impact: funding, growth, exits, product
- Technical importance: AI, eng, product insights
- Source credibility: "${source}" (well-known publications score higher)

Classify into exactly ONE category: funding, founder_stories, ai, scalable_business.

Write a short 2-3 sentence founder-focused summary.

Return ONLY a single JSON object, no other text:
{"category":"<one of: funding, founder_stories, ai, scalable_business>","summary":"...","score":<0-100>}

Title: ${title}

Description: ${(description || '').slice(0, 2000)}`

  const callGroq = (useJsonFormat) =>
    groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      ...(useJsonFormat ? { response_format: { type: "json_object" } } : {})
    })

  let text
  try {
    const completion = await callGroq(true)
    text = completion.choices[0].message.content
  } catch (err) {
    const is429 = err.status === 429 || err?.error?.error?.code === 'rate_limit_exceeded'
    if (is429) {
      const retryAfter = err.headers?.get?.('retry-after')
      const delayMs = retryAfter ? Math.min(Number(retryAfter) * 1000, 60000) : 2000
      await new Promise((r) => setTimeout(r, delayMs))
      const completion = await callGroq(true)
      text = completion.choices[0].message.content
    } else {
      const completion = await callGroq(false)
      text = completion.choices[0].message.content
    }
  }

  text = text || ''
  const jsonMatch = text && text.match(/\{[\s\S]*\}/)

  if (!jsonMatch) {
    return {
      category: "ai",
      summary: (description || title || '').slice(0, 200),
      score: 50
    }
  }

  let parsed
  try {
    parsed = JSON.parse(jsonMatch[0])
  } catch {
    return {
      category: "ai",
      summary: (description || title || '').slice(0, 200),
      score: 50
    }
  }

  const category = CATEGORIES.includes(parsed.category) ? parsed.category : CATEGORIES[0]
  const summary = typeof parsed.summary === 'string' ? parsed.summary.trim() : (description || title || '').slice(0, 200)
  let score = typeof parsed.score === 'number' ? parsed.score : 50
  score = Math.min(100, Math.max(0, score))

  return { category, summary, score }
}
