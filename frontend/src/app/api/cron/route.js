export const dynamic = "force-dynamic"

function unauthorized() {
  return new Response(JSON.stringify({ error: "Unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  })
}

export async function GET(req) {
  const startedAt = Date.now()
  const cronSecret = process.env.CRON_SECRET
  const auth = req.headers.get("authorization") || ""

  if (cronSecret && auth !== `Bearer ${cronSecret}`) {
    console.error("[Vercel Cron Proxy] Unauthorized request to /api/cron")
    return unauthorized()
  }

  const backendUrl = process.env.BACKEND_CRON_URL
  if (!backendUrl) {
    console.error("[Vercel Cron Proxy] Missing BACKEND_CRON_URL")
    return new Response(JSON.stringify({ error: "BACKEND_CRON_URL is not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    })
  }

  const backendSecret = process.env.BACKEND_CRON_SECRET || cronSecret
  try {
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
    if (!response.ok) {
      console.error(
        `[Vercel Cron Proxy] Backend call failed: status=${response.status} url=${backendUrl} body=${text}`
      )
    } else {
      console.log(
        `[Vercel Cron Proxy] Backend call succeeded: status=${response.status} elapsed_ms=${Date.now() - startedAt}`
      )
    }

    return new Response(text, {
      status: response.status,
      headers: { "content-type": "application/json" },
    })
  } catch (err) {
    console.error("[Vercel Cron Proxy] Fetch to backend failed:", err)
    return new Response(JSON.stringify({ error: "Failed to call backend cron endpoint" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    })
  }
}
