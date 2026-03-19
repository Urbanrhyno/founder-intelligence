import { fetchFeeds } from "../../scrapers/fetchFeeds.js"
import { fetchGNewsArticles } from "../../scrapers/gnewsFetcher.js"

let isIngestionRunning = false

/**
 * Runs the same ingestion flow used by scheduler.js once.
 * Guarded to avoid overlapping runs from manual/cron triggers.
 */
export async function runScheduledIngestion() {
  if (isIngestionRunning) {
    console.warn("[Ingestion Runner] Skip: ingestion already in progress")
    return {
      ok: false,
      skipped: true,
      reason: "Ingestion already in progress",
    }
  }

  isIngestionRunning = true
  const startedAt = Date.now()
  try {
    console.log("[Ingestion Runner] Running RSS news ingestion...")
    const rssResult = await fetchFeeds()
    console.log(`[Ingestion Runner] RSS completed: inserted=${rssResult?.inserted ?? "n/a"} recent=${rssResult?.recent ?? "n/a"}`)

    console.log("[Ingestion Runner] Running GNews ingestion (experimental)...")
    const gnewsResult = await fetchGNewsArticles()
    console.log(
      `[Ingestion Runner] GNews completed: inserted=${gnewsResult?.inserted ?? "n/a"} recent=${gnewsResult?.recent ?? "n/a"}`
    )

    const at = new Date().toISOString()
    console.log(`[Ingestion Runner] Completed successfully at=${at} elapsed_ms=${Date.now() - startedAt}`)
    return {
      ok: true,
      skipped: false,
      rss: rssResult,
      gnews: gnewsResult,
      at,
    }
  } catch (err) {
    console.error("[Ingestion Runner] Failed:", err)
    throw err
  } finally {
    isIngestionRunning = false
  }
}
