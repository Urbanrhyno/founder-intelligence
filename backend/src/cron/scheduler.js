import cron from "node-cron"
import { runScheduledIngestion } from "./runScheduledIngestion.js"
import { broadcastMessage } from "../index.js"

console.log("Founder Intelligence cron started (4x daily IST: 1:00, 7:00, 13:00, 19:00)")

cron.schedule(
  "0 1,7,13,19 * * *",
  async () => {
    const result = await runScheduledIngestion()
    if (!result.ok) {
      console.warn("[Scheduler] Skipping run:", result.reason)
      return
    }

    broadcastMessage({
      type: "articles-updated",
      at: result.at,
      rss: result.rss,
      gnews: result.gnews,
    })
  },
  {
    timezone: "Asia/Kolkata"
  }
)