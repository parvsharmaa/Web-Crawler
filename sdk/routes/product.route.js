import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

class ProductRoutes {
  constructor(app) {
    this.router = Router();
    this.app = app;
  }

  setupRoutes() {
    // authenticate user before accessing routes
    this.router.use(AuthMiddleware.authenticateUser);

    this.router.get('/search', ProductController.searchProducts);

    this.router.get('/advance-search', ProductController.crawlSearch);

    this.router.get('/num-searches', ProductController.getNumberOfSearches);

    this.router.get('/recent-searches', ProductController.getRecentSearches);

    this.router.get('/most-searched', ProductController.getMostSearched);

    this.app.use('/products', this.router);
  }
}

export default ProductRoutes;
