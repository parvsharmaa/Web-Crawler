import express from 'express';
import { launch } from 'puppeteer';
import scrapeAmazon from './amazonScraper.js';
import { retry } from './utils/retry.js';

const app = express();
const PORT = process.env.CRAWLER_PORT || 8080;

app.use(express.json());

app.post('/scrape', async (req, res) => {
  try {
    const { searchPhrase, scrapeToPage } = req.body;

    if (!searchPhrase) {
      return res.status(400).json({ error: 'Missing search parameters' });
    }

    // Launch browser
    const browser = await launch({ headless: true, defaultViewport: null });
    const page = await browser.newPage();

    // Scrape Amazon
    const scrapedData = await retry(async () => {
      return await scrapeAmazon(page, searchPhrase, scrapeToPage || 1);
    }, 3);

    // Close the browser
    await browser.close();

    res.status(200).json({ message: 'Scraping successful', data: scrapedData });
  } catch (error) {
    console.error('An error occurred during scraping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(` crawler server is running on http://localhost:${PORT}`);
});
