import express from 'express';
import connectToDatabase from './config/db.js';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import crawlerRoutes from './routes/crawler.route.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectToDatabase();

// Middleware
app.use(express.json());

// Routes
app.use('/auth', userRoutes);
app.use('/products', productRoutes);
app.use('/crawl', crawlerRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
