export const dynamic = "force-dynamic"

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  })
}

export async function GET(req) {
  const cronSecret = process.env.CRON_SECRET
  const auth = req.headers.get("authorization") || ""

  if (cronSecret && auth !== `Bearer ${cronSecret}`) {
    return unauthorized()
  }

  const backendUrl = process.env.BACKEND_CRON_URL
  if (!backendUrl) {
    return new Response(JSON.stringify({ error: "BACKEND_CRON_URL is not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }

  const backendSecret = process.env.BACKEND_CRON_SECRET || cronSecret
  const response = await fetch(backendUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(backendSecret ? { authorization: `Bearer ${backendSecret}` } : {}),
    },
    body: JSON.stringify({
      trigger: "vercel-cron",
      at: new Date().toISOString(),
    }),
    cache: "no-store",
  })

  const text = await response.text()
  return new Response(text, {
    status: response.status,
    headers: { "content-type": "application/json" },
  })
}
