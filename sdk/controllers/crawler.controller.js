import axios from 'axios';
import { CRAWLER_API } from '../config/config.js';
import Product from '../models/product.model.js';

async function scrape(req, res) {
  try {
    const searchPhrase = req.body.searchTerm;
    const scrapeToPage = req.body.scrapeToPage || 1;

    if (!searchPhrase) {
      return res.status(400).json({ error: 'search not provided' });
    }

    console.log('Scrapping the data from crawler...');
    // Make a POST request to the web crawler service
    const response = await axios.post(CRAWLER_API, {
      searchPhrase,
      scrapeToPage,
    });

    // Check if the request was successful
    if (response.status === 200) {
      const products = response.data.data;

      // store the scraped data in the database
      await Product.create(products);

      // if request was from advanced search return the results
      if (req.advancedSearch) {
        return products;
      }

      res.status(200).json({
        products,
        message: 'Data scraped and stored successfully',
      });
    } else {
      throw new Error('Failed to fetch data from crawler');
    }
  } catch (error) {
    console.error('Error triggering crawler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { scrape };
