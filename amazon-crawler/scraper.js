import { launch } from 'puppeteer';
import { writeFileSync } from 'fs';
import scrapeAmazon from './amazonScraper.js';

/**
 * Define search parameters
 * @type {string}
 */
const searchPhrase = 'iphone 15 pro'; // Set your search phrase here

/**
 * Set the desired page to scrape to
 * @type {number}
 */
const scrapeToPage = 1;

/**
 * Function to run the scraping script
 */
async function runScraping() {
  try {
    // Launch browser
    const browser = await launch({
      headless: true,
      defaultViewport: null,
    });
    const page = await browser.newPage();

    // Scrape Amazon
    const scrapedData = await scrapeAmazon(page, searchPhrase, scrapeToPage);

    // Log scraping finished
    console.log('Scraping finished.');

    // Save JSON to file
    const outputFilename = 'scrapedData.json';
    writeFileSync(outputFilename, JSON.stringify(scrapedData, null, 2), 'utf8');
    console.log(`Data saved to ${outputFilename}`);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the scraping function
runScraping();
