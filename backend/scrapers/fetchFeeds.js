process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

import { processArticle } from "../services/aiProcessor.js"
import { SOURCES } from "../config/sources.js"
import 'dotenv/config'
import Parser from "rss-parser"
import pkg from "pg"

const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

const parser = new Parser({
  timeout: 10000,
  headers: { 'User-Agent': 'FounderIntelligence/1.0' },
})

const BATCH_SIZE = 10

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size))
  }
  return out
}

/**
 * Fetch all feeds, filter last 24h, process in batches of 10 with parallel AI, insert (ON CONFLICT DO NOTHING).
 */
export async function fetchFeeds() {
  console.log('Fetching feeds...')

  const allItems = []
  const feeds = SOURCES.map((s) => ({ name: s.name, url: s.rss_url || s.url }))

  for (const feed of feeds) {
    try {
      const result = await parser.parseURL(feed.url)
      const items = (result.items || []).map((item) => {
        const link = (item.link || item.guid || '').trim()
        let publishedAt = new Date()
        if (item.pubDate) {
          const d = new Date(item.pubDate)
          if (!Number.isNaN(d.getTime())) publishedAt = d
        }
        const description = (item.content || item.contentSnippet || item.summary || item.description || '').trim()
        return {
          title: (item.title || '').trim(),
          link,
          source: feed.name,
          publishedDate: publishedAt,
          description: description.slice(0, 2000) || null,
        }
      })
      allItems.push(...items.filter((i) => i.title && i.link))
    } catch (err) {
      console.error(`Failed to fetch ${feed.name}:`, err.message)
    }
  }

  const cutoff = Date.now() - 24 * 60 * 60 * 1000
  const recentItems = allItems.filter((i) => i.publishedDate.getTime() >= cutoff)
  console.log(`Articles found: ${allItems.length}, within last 24h: ${recentItems.length}`)

  let inserted = 0
  const batches = chunk(recentItems, BATCH_SIZE)

  for (let b = 0; b < batches.length; b++) {
    if (b > 0) {
      await new Promise((r) => setTimeout(r, 2500))
    }
    const batch = batches[b]
    let results
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        results = await Promise.all(
          batch.map((item) =>
            processArticle(item.title, item.description || '', {
              source: item.source,
              publishedAt: item.publishedDate,
            })
          )
        )
        break
      } catch (err) {
        const is429 = err.status === 429 || err?.error?.error?.code === 'rate_limit_exceeded'
        if (is429 && attempt < 3) {
          const wait = 60000
          console.log(`Rate limited (TPM), waiting ${wait / 1000}s before retry...`)
          await new Promise((r) => setTimeout(r, wait))
        } else {
          throw err
        }
      }
    }

    for (let i = 0; i < batch.length; i++) {
      const item = batch[i]
      const ai = results[i]
      const title = item.title
      const url = item.link
      const source = item.source || 'Unknown'
      const publishedAt = item.publishedDate
      const score = ai != null && typeof ai.score === 'number' ? ai.score : 50
      try {
        const result = await pool.query(
          `INSERT INTO articles (title, url, source, published_at, category, summary, score)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (url) DO NOTHING`,
          [title, url, source, publishedAt, ai.category, ai.summary, score]
        )
        inserted += result.rowCount ?? 0
      } catch (e) {
        console.error('[Ingestion] Insert failed:', url, e.message)
      }
    }
  }

  console.log(`Articles inserted: ${inserted}`)
  return { found: allItems.length, recent: recentItems.length, inserted }
}

const isMain = process.argv[1]?.endsWith('fetchFeeds.js')
if (isMain) {
  fetchFeeds()
    .then(() => pool.end())
    .catch((e) => {
      console.error(e)
      pool.end()
      process.exit(1)
    })
}
