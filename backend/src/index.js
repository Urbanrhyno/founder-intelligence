import 'dotenv/config';
import express from "express"
import cors from "cors"
import http from "http"
import { WebSocketServer } from "ws"

import "./cron/scheduler.js"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Founder Intelligence API is running")
})

// HTTP server + WebSocket server
const server = http.createServer(app)
const wss = new WebSocketServer({ server })

const clients = new Set()

wss.on("connection", (ws) => {
  clients.add(ws)
  ws.on("close", () => clients.delete(ws))
})

export function broadcastMessage(message) {
  const payload = typeof message === "string" ? message : JSON.stringify(message)
  for (const ws of clients) {
    if (ws.readyState === ws.OPEN) {
      ws.send(payload)
    }
  }
}

const PORT = 3001

server.listen(PORT, () => {
  console.log(`Founder Intelligence API listening on http://localhost:${PORT}`)
})