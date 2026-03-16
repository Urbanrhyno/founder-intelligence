import cron from "node-cron"
import { fetchFeeds } from "../../scrapers/fetchFeeds.js"

console.log("Founder Intelligence cron started (4x daily IST: 1:00, 7:00, 13:00, 19:00)")

cron.schedule(
  "0 1,7,13,19 * * *",
  async () => {
    console.log("Running news ingestion...")
    await fetchFeeds()
  },
  {
    timezone: "Asia/Kolkata"
  }
)