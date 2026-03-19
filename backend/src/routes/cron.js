import { Router } from "express"
import { runScheduledIngestion } from "../cron/runScheduledIngestion.js"

const router = Router()

function isAuthorized(req) {
  const expected = process.env.CRON_SECRET
  if (!expected) return true

  const auth = req.headers.authorization || ""
  return auth === `Bearer ${expected}`
}

router.post("/run", async (req, res) => {
  const startedAt = Date.now()
  if (!isAuthorized(req)) {
    console.error("[Cron Endpoint] Unauthorized POST /cron/run")
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    console.log("[Cron Endpoint] Trigger received, starting ingestion run")
    const result = await runScheduledIngestion()
    if (result.skipped) {
      console.warn(`[Cron Endpoint] Run skipped: reason=${result.reason}`)
      return res.status(409).json(result)
    }
    console.log(
      `[Cron Endpoint] Run completed: elapsed_ms=${Date.now() - startedAt} rss_inserted=${result?.rss?.inserted ?? "n/a"} gnews_inserted=${result?.gnews?.inserted ?? "n/a"}`
    )
    return res.json(result)
  } catch (err) {
    console.error("[Cron] Manual trigger failed:", err)
    return res.status(500).json({ error: "Failed to run ingestion" })
  }
})

export default router
