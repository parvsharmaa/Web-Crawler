import { Router } from 'express';
import CrawlerController from '../controllers/crawler.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

class CrawlerRoutes {
  constructor(app) {
    this.router = Router();
    this.app = app;
  }

  setupRoutes() {
    this.router.post(
      '/',
      AuthMiddleware.authenticateUser,
      CrawlerController.scrape
    );
    this.app.use('/crawl', this.router);
  }
}

export default CrawlerRoutes;
