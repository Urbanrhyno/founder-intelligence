import 'dotenv/config';
import express from "express"
import cors from "cors"

import "./cron/scheduler.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Founder Intelligence API is running")
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Founder Intelligence API listening on http://localhost:${PORT}`)
})