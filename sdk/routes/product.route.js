import { Router } from 'express';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import {
  searchProducts,
  crawlSearch,
  getNumberOfSearches,
  getRecentSearches,
  getMostSearchedKeywords,
} from '../controllers/product.controller.js';

const router = Router();

router.get('/search', authenticateUser, searchProducts);

router.get('/advance-search', authenticateUser, crawlSearch);

router.get('/num-searches', authenticateUser, getNumberOfSearches);

router.get('/recent-searches', authenticateUser, getRecentSearches);

router.get('/most-searched', authenticateUser, getMostSearchedKeywords);

export default router;
