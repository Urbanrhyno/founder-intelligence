import { Router } from 'express';
import { getTopArticlesByCategory } from '../services/articleService.js';

const router = Router();

/**
 * GET /articles?category=ai
 * Returns top 5 articles for the given category (or all if no category), ordered by score.
 */
router.get('/', async (req, res) => {
  try {
    const category = (req.query.category || '').trim().toLowerCase() || null;
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 20);
    const articles = await getTopArticlesByCategory(category, limit);
    res.json(articles);
  } catch (err) {
    console.error('[API] GET /articles:', err);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

export default router;
