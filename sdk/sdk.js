import ProductRoutes from './routes/product.route.js';
import UserRoutes from './routes/user.route.js';
import CrawlerRoutes from './routes/crawler.route.js';
import express from 'express';

class SDK {
  constructor(app) {
    this.app = app;
  }

  setupRoutes() {
    // Middleware
    this.app.use(express.json());

    // Setup routes
    new ProductRoutes(this.app).setupRoutes();
    new UserRoutes(this.app).setupRoutes();
    new CrawlerRoutes(this.app).setupRoutes();
  }

  startServer(port) {
    // Start server
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

export default SDK;
