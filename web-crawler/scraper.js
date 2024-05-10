import express from 'express';
import { launch } from 'puppeteer';
import ScraperFactory from './config/scraperFactory.js';

const app = express();
const PORT = process.env.CRAWLER_PORT || 8080;

app.use(express.json());

app.post('/scrape', async (req, res) => {
  try {
    const { website, searchPhrase, scrapeToPage } = req.body;

    if (!website || !searchPhrase) {
      return res.status(400).json({ error: 'Missing parameters' });
    }

    // Launch browser
    const browser = await launch({ headless: true, defaultViewport: null });
    const page = await browser.newPage();

    // Get the appropriate scraper based on the website
    const scraper = ScraperFactory.createScraper(website);

    if (!scraper) {
      return res.status(400).json({ error: 'Unsupported website' });
    }

    // Scrape data using the scraper
    const scrapedData = await scraper.scrape(page, searchPhrase, scrapeToPage);

    // Close the browser
    await browser.close();

    res.status(200).json({ message: 'Scraping successful', data: scrapedData });
  } catch (error) {
    console.error('An error occurred during scraping:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Crawler server is running on http://localhost:${PORT}`);
});
