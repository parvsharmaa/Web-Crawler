import { Router } from 'express';
import { scrape } from '../controllers/crawler.controller.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', authenticateUser, scrape);

export default router;
