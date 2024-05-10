import Product from '../models/product.model.js';
import Search from '../models/search.model.js';
import CrawlerController from './crawler.controller.js';

class ProductController {
  static async searchProducts(req, res) {
    try {
      // extract search query
      const searchTerm = req.query.q;
      const { userId } = req.user;

      const products = await Product.find({
        $or: [{ productName: { $regex: searchTerm, $options: 'i' } }],
      });

      // Save search record
      await ProductController.saveSearch(searchTerm, userId);

      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async crawlSearch(req, res) {
    try {

      // extract search query
      const searchTerm = req.query.q;
      const { userId } = req.user;

      let products = await Product.find({
        $or: [{ productName: { $regex: searchTerm, $options: 'i' } }],
      });

      if (products && products.length > 0) {
        return res.json({ products });
      }

      req.advancedSearch = true;
      req.body.searchTerm = searchTerm;
      req.body.scrapeToPage = 1;

      // scrape data from crawler
      products = await CrawlerController.scrape(req, res);

      // Save search record
      await ProductController.saveSearch(searchTerm, userId);

      res.json({ products });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async saveSearch(query, userId) {
    const search = new Search({
      query,
      userId,
    });

    await search.save();
  }

  static async getNumberOfSearches(req, res) {
    try {
      // extract user from request
      const { userId } = req.user;

      // count the total number of searches done by the user so far
      const count = await Search.countDocuments({ userId });

      res.json({ searches: count });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getRecentSearches(req, res) {
    try {
      const { userId } = req.user;

      // Limit to 10 most recent searches
      const recentSearches = await Search.find({ userId })
        .sort({ timestamp: -1 })
        .limit(10);

      res.json({ recentSearches });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getMostSearchedKeywords(req, res) {
    try {
      // Limit to top 10 most searched keywords
      const mostSearchedKeywords = await Search.aggregate([
        { $group: { _id: '$query', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]);

      res.json({ mostSearchedKeywords });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ProductController;
