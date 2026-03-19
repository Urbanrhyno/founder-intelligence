# Founder Intelligence

Production-ready full-stack app that collects high-quality articles for startup founders and surfaces the most important insights.

## Features

- **RSS ingestion**: TechCrunch, VentureBeat, MIT Technology Review, First Round Review, Y Combinator Blog, Harvard Business Review, Indie Hackers
- **Deduplication**: By URL and by title similarity
- **AI (OpenAI)**: Category classification and 3-sentence founder-focused summaries
- **Ranking**: Score by source credibility, recency, and keywords
- **API**: `GET /articles?category=ai` — top 5 articles by score
- **Cron**: Runs every 2 hours (fetch → dedupe → classify → summarize → score → save)
- **Frontend**: Dark theme (black/white, red accent), four sections with top 5 articles each

## Project structure

```
/frontend       Next.js app
/backend        Express API, Prisma, cron, services
/database       Database notes (schema in backend/prisma)
/scrapers       RSS fetcher (backend/src/scrapers)
/services       Dedupe, OpenAI, scoring (backend/src/services)
/cron           Scheduler and one-off run (backend/src/cron)
```

## Environment variables

### Backend (`backend/.env`)

| Variable        | Description                          |
|----------------|--------------------------------------|
| `OPENAI_API_KEY` | OpenAI API key for classification and summaries |
| `DATABASE_URL`   | PostgreSQL connection string, e.g. `postgresql://user:password@localhost:5432/founder_intelligence` |
| `PORT`           | Optional; API port (default `3001`)  |
| `CRON_SECRET`    | Shared secret for protected cron trigger endpoint |

### Frontend (`frontend/.env.local`)

| Variable              | Description                    |
|-----------------------|--------------------------------|
| `NEXT_PUBLIC_API_URL` | Backend base URL (e.g. `http://localhost:3001`) |
| `BACKEND_CRON_URL`    | Backend cron endpoint URL (e.g. `https://news.gorkhaventures.com/cron/run`) |
| `CRON_SECRET`         | Secret Vercel uses to call `/api/cron` (`Authorization: Bearer ...`) |
| `BACKEND_CRON_SECRET` | Secret forwarded by `/api/cron` to backend; defaults to `CRON_SECRET` if unset |

## Setup

### 1. Database

- Install and run PostgreSQL.
- Create a database (e.g. `founder_intelligence`).

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env: set OPENAI_API_KEY and DATABASE_URL

npm install
npx prisma generate
npx prisma db push

# Start API (and cron)
npm run dev
```

- Optional: run ingestion once without waiting for cron:
  ```bash
  npm run cron
  ```

- Manual trigger endpoint (secured with `CRON_SECRET`):
  ```bash
  curl -X POST http://localhost:3001/cron/run -H "Authorization: Bearer <CRON_SECRET>"
  ```

### 3. Frontend

```bash
cd frontend
cp .env.local.example .env.local
# Set NEXT_PUBLIC_API_URL to http://localhost:3001 (or your backend URL)

npm install
npm run dev
```

- Open [http://localhost:3000](http://localhost:3000).
- For Vercel Cron, add `frontend/vercel.json` and set frontend env vars (`BACKEND_CRON_URL`, `CRON_SECRET`, `BACKEND_CRON_SECRET`).

## API

- `GET /articles?category=ai&limit=5` — Returns articles (top 5 by default) for the given category. Omit `category` for all. `limit` max 20.
- `GET /health` — Health check.

## Categories

- `funding` — Startup Funding & Exits  
- `founder_stories` — Founder Growth Stories  
- `ai` — AI Innovations  
- `scalable_business` — Building Scalable Businesses  

## Tech stack

- **Frontend**: Next.js  
- **Backend**: Node.js, Express  
- **Database**: PostgreSQL  
- **ORM**: Prisma  
- **Scheduling**: node-cron  
- **AI**: OpenAI API  
- **RSS**: rss-parser  
