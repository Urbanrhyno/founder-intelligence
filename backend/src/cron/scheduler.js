import cron from "node-cron"
import { fetchFeeds } from "../../scrapers/fetchFeeds.js"
import { fetchGNewsArticles } from "../../scrapers/gnewsFetcher.js"
import { broadcastMessage } from "../index.js"

console.log("Founder Intelligence cron started (4x daily IST: 1:00, 7:00, 13:00, 19:00)")

cron.schedule(
  "0 1,7,13,19 * * *",
  async () => {
    console.log("Running RSS news ingestion...")
    const rssResult = await fetchFeeds()

    console.log("Running GNews ingestion (experimental)...")
    const gnewsResult = await fetchGNewsArticles()

    broadcastMessage({
      type: "articles-updated",
      at: new Date().toISOString(),
      rss: rssResult,
      gnews: gnewsResult,
    })
  },
  {
    timezone: "Asia/Kolkata"
  }
)