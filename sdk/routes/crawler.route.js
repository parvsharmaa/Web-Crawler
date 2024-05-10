import { Router } from 'express';
import CrawlerController from '../controllers/crawler.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

class CrawlerRoutes {
  constructor(app) {
    this.router = Router();
    this.app = app;
  }

  setupRoutes() {
    // authenticate user before accessing routes
    this.router.use(AuthMiddleware.authenticateUser);

    this.router.post('/', CrawlerController.scrape);

    this.app.use('/crawl', this.router);
  }
}

export default CrawlerRoutes;
