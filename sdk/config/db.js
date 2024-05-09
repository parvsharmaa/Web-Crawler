import { connect } from 'mongoose';
import { DB_URI } from './config.js';

async function connectToDatabase() {
  try {
    await connect(DB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectToDatabase;
