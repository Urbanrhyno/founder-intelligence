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
 * @param {{ source?: string, publishedAt?: Date, category_bias?: string }} [opts] - optional for recency, source credibility, and category hint
 * @returns {Promise<{ category: string, summary: string, score: number }>}
 */
export async function processArticle(title, description, opts = {}) {
  const { source = 'Unknown', publishedAt, category_bias } = opts
  const ageHours = publishedAt
    ? Math.max(0, (Date.now() - new Date(publishedAt).getTime()) / (1000 * 60 * 60))
    : 0

  const categoryHint = category_bias && CATEGORIES.includes(category_bias)
    ? `\nThis source is known for "${category_bias}" content. When the article is clearly about growth, scaling, company building, or operations, prefer category: ${category_bias}.`
    : ''

  const prompt = `You are a classifier and scorer for a startup founder news aggregator.

Consider these factors when scoring (0-100):
- Recency: newer articles score higher (article age: ~${Math.round(ageHours)} hours)
- Founder relevance: actionable for startup founders
- Startup impact: funding, growth, exits, product
- Technical importance: AI, eng, product insights
- Source credibility: "${source}" (well-known publications score higher)

Classify into exactly ONE category: funding, founder_stories, ai, scalable_business.${categoryHint}

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

/**
 * Batch classify and score multiple articles in a single Groq call.
 * @param {Array<{ title: string, description?: string, source?: string, publishedAt?: Date, category_bias?: string }>} items
 * @returns {Promise<Array<{ category: string, summary: string, score: number }>>}
 */
export async function processArticlesBatch(items) {
  if (!Array.isArray(items) || items.length === 0) return []

  const now = Date.now()

  const articlesBlock = items
    .map((item, index) => {
      const title = item.title || ''
      const description = item.description || ''
      const source = item.source || 'Unknown'
      const publishedAt = item.publishedAt || item.published_at || null
      const ageHours = publishedAt
        ? Math.max(0, (now - new Date(publishedAt).getTime()) / (1000 * 60 * 60))
        : 0
      const categoryBias = item.category_bias && CATEGORIES.includes(item.category_bias)
        ? item.category_bias
        : null

      return [
        `Article ${index}:`,
        `Title: ${title}`,
        `Description: ${description.slice(0, 2000)}`,
        `Source: ${source}`,
        `AgeHours: ~${Math.round(ageHours)}`,
        categoryBias ? `CategoryHint: ${categoryBias}` : '',
      ].filter(Boolean).join('\n')
    })
    .join('\n\n')

  const prompt = `You are a classifier and scorer for a startup founder news aggregator.

For EACH article i, you must choose exactly ONE category from:
- funding
- founder_stories
- ai
- scalable_business

Scoring guidelines (0-100):
- Recency: newer articles score higher.
- Founder relevance: actionable for startup founders.
- Startup impact: funding, growth, exits, product, traction.
- Technical importance: AI, engineering, product insights.
- Source credibility: respected sources score higher.

If CategoryHint is provided and the article is clearly about growth, scaling, company building, or operations, you should strongly prefer that hinted category.

Return ONLY a JSON array of objects, nothing else. Each object MUST have:
- index (number, matching the article index)
- category (one of: funding, founder_stories, ai, scalable_business)
- summary (2-3 concise sentences for founders)
- score (number 0-100)

Example single element:
{"index":0,"category":"scalable_business","summary":"...","score":87}

Articles:
${articlesBlock}`

  const response = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
    temperature: 0.2,
    response_format: { type: 'json_object' },
  })

  const raw = (response.choices[0]?.message?.content || '').trim()
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    // If the model returned a bare array, try to parse again
    try {
      parsed = JSON.parse(raw.replace(/^[^{\[]+/, ''))
    } catch {
      return items.map((item) => ({
        category: 'ai',
        summary: (item.description || item.title || '').slice(0, 200),
        score: 50,
      }))
    }
  }

  const resultsArray = Array.isArray(parsed.articles) ? parsed.articles : (
    Array.isArray(parsed) ? parsed : []
  )

  if (!Array.isArray(resultsArray) || resultsArray.length === 0) {
    return items.map((item) => ({
      category: 'ai',
      summary: (item.description || item.title || '').slice(0, 200),
      score: 50,
    }))
  }

  return items.map((item, index) => {
    const match = resultsArray.find((r) => r.index === index) || {}
    const category = CATEGORIES.includes(match.category) ? match.category : 'ai'
    const summary = typeof match.summary === 'string'
      ? match.summary.trim()
      : (item.description || item.title || '').slice(0, 200)
    let score = typeof match.score === 'number' ? match.score : 50
    score = Math.min(100, Math.max(0, score))
    return { category, summary, score }
  })
}
