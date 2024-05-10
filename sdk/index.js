import express from 'express';
import rateLimit from 'express-rate-limit';
import Database from './config/db.js';
import SDK from './config/sdk.js';

class MySDK {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;

    // Connect to MongoDB
    Database.connectToDatabase();

    // Apply rate limiting middleware
    this.applyRateLimit();

    // Initialize SDK
    this.setupSDK();
  }

  applyRateLimit() {
    // Define rate limiting options
    const limiter = rateLimit({
      windowMs: 60 * 1000, // 1 minute
      max: 50, // Max 50 requests per minute
      message: 'Rate limit exceeded. Please try again later.',
    });

    // Apply rate limiter to all requests
    this.app.use(limiter);
  }

  setupSDK() {
    const sdk = new SDK(this.app);
    sdk.setupRoutes();
    sdk.startServer(this.PORT);
  }
}

new MySDK();
