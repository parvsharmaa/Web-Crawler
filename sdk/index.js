import express from 'express';
import Database from './config/db.js';
import SDK from './sdk.js';

class MySDK {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;

    // Connect to MongoDB
    Database.connectToDatabase();

    // Initialize SDK
    this.setupSDK();
  }

  setupSDK() {
    const sdk = new SDK(this.app);
    sdk.setupRoutes();
    sdk.startServer(this.PORT);
  }
}

new MySDK();
