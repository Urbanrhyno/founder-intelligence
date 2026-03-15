import cron from "node-cron"
import { fetchFeeds } from "../../scrapers/fetchFeeds.js"

console.log("Daily scraper scheduler started")

cron.schedule(
  "0 4 * * *",
  async () => {
    console.log("Running daily news ingestion...")
    await fetchFeeds()
  },
  {
    timezone: "Asia/Kolkata"
  }
)