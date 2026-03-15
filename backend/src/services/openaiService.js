import OpenAI from 'openai';
import { CATEGORIES } from '../config/feeds.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CATEGORY_SYSTEM = `You are a classifier for a startup founder news aggregator. 
Classify each article into exactly one of these categories: ${CATEGORIES.join(', ')}.
Respond with only the category name, nothing else.`;

const SUMMARY_SYSTEM = `You write concise 3-sentence summaries for startup founders. 
Focus on actionable insights, key numbers, and why it matters for building companies. 
Keep each sentence under 25 words. No bullet points, just three flowing sentences.`;

/**
 * Classify article into one of the four categories using OpenAI.
 * @param {string} title
 * @param {string} [contentOrSnippet]
 * @returns {Promise<string>} category
 */
export async function classifyArticle(title, contentOrSnippet = '') {
  const text = [title, contentOrSnippet].filter(Boolean).join('\n');
  const truncated = text.slice(0, 2000);
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: CATEGORY_SYSTEM },
      { role: 'user', content: `Classify this article:\n\n${truncated}` },
    ],
    max_tokens: 20,
    temperature: 0.1,
  });
  const raw = (response.choices[0]?.message?.content || '').trim().toLowerCase();
  const normalized = raw.replace(/\s+/g, '_');
  if (CATEGORIES.includes(normalized)) return normalized;
  const fallback = CATEGORIES.find((c) => normalized.includes(c)) || CATEGORIES[0];
  return fallback;
}

/**
 * Generate a 3-sentence founder-focused summary.
 * @param {string} title
 * @param {string} [contentOrSnippet]
 * @returns {Promise<string>}
 */
export async function generateSummary(title, contentOrSnippet = '') {
  const text = [title, contentOrSnippet].filter(Boolean).join('\n');
  const truncated = text.slice(0, 3000);
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SUMMARY_SYSTEM },
      { role: 'user', content: `Summarize for founders:\n\n${truncated}` },
    ],
    max_tokens: 150,
    temperature: 0.3,
  });
  return (response.choices[0]?.message?.content || title).trim();
}
