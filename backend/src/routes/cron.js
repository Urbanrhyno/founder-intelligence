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
  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const result = await runScheduledIngestion()
    if (result.skipped) {
      return res.status(409).json(result)
    }
    return res.json(result)
  } catch (err) {
    console.error("[Cron] Manual trigger failed:", err)
    return res.status(500).json({ error: "Failed to run ingestion" })
  }
})

export default router
