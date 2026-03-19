import { fetchFeeds } from "../../scrapers/fetchFeeds.js"
import { fetchGNewsArticles } from "../../scrapers/gnewsFetcher.js"

let isIngestionRunning = false

/**
 * Runs the same ingestion flow used by scheduler.js once.
 * Guarded to avoid overlapping runs from manual/cron triggers.
 */
export async function runScheduledIngestion() {
  if (isIngestionRunning) {
    return {
      ok: false,
      skipped: true,
      reason: "Ingestion already in progress",
    }
  }

  isIngestionRunning = true
  try {
    console.log("Running RSS news ingestion...")
    const rssResult = await fetchFeeds()

    console.log("Running GNews ingestion (experimental)...")
    const gnewsResult = await fetchGNewsArticles()

    return {
      ok: true,
      skipped: false,
      rss: rssResult,
      gnews: gnewsResult,
      at: new Date().toISOString(),
    }
  } finally {
    isIngestionRunning = false
  }
}
