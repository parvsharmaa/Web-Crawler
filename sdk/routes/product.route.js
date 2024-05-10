import { Router } from 'express';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import ProductController from '../controllers/product.controller.js';

class ProductRoutes {
  constructor(app) {
    this.router = Router();
    this.app = app;
  }

  setupRoutes() {
    this.router.get(
      '/search',
      AuthMiddleware.authenticateUser,
      ProductController.searchProducts
    );
    this.router.get(
      '/advance-search',
      AuthMiddleware.authenticateUser,
      ProductController.crawlSearch
    );
    this.router.get(
      '/num-searches',
      AuthMiddleware.authenticateUser,
      ProductController.getNumberOfSearches
    );
    this.router.get(
      '/recent-searches',
      AuthMiddleware.authenticateUser,
      ProductController.getRecentSearches
    );
    this.router.get(
      '/most-searched',
      AuthMiddleware.authenticateUser,
      ProductController.getMostSearchedKeywords
    );
    this.app.use('/products', this.router);
  }
}

export default ProductRoutes;
