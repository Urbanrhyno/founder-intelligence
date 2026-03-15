import 'dotenv/config'
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function processArticle(title, description) {

  const prompt = `
Classify the article into ONE category:

funding
founder_stories
ai
scalable_business

Also write a short 2 sentence summary.

Title: ${title}

Description: ${description}

Return JSON:
{
"category":"",
"summary":""
}
`

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    temperature: 0.2
  })

  const text = completion.choices[0].message.content

  const jsonMatch = text.match(/\{[\s\S]*\}/)

  if (!jsonMatch) {
    return {
      category: "ai",
      summary: description.slice(0,200)
    }
  }

  return JSON.parse(jsonMatch[0])
}