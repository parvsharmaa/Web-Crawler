import { MongoClient } from 'mongodb';
import { DB_URI } from '../utils/const.js';

// Singleton MongoDB client instance
let client;

// Function to connect to MongoDB Atlas and store data
async function storeDataInMongoDB(data) {
  try {
    // Create a new MongoClient instance if it doesn't exist
    if (!client) {
      client = new MongoClient(DB_URI);
      // Connect to MongoDB Atlas
      await client.connect();
    }

    // Access the database and collection
    const database = client.db('amazon');
    const collection = database.collection('products');

    // Insert the data into the collection
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (error) {
    console.error('Error storing data in MongoDB:', error);
  }
}

// Function to close the MongoDB connection
async function closeMongoDBConnection() {
  if (client) {
    await client.close();
    client = undefined;
    console.log('MongoDB connection closed');
  }
}

export { storeDataInMongoDB, closeMongoDBConnection };
