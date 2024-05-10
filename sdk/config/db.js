import { connect } from 'mongoose';
import Config from './config.js';

class Database {
  static async connectToDatabase() {
    try {
      await connect(Config.DB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}

export default Database;
