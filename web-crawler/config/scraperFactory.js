import AmazonScraper from '../web/amazonScraper.js';

class ScraperFactory {
  static createScraper(website) {
    switch (website.toLowerCase()) {
      case 'amazon':
        return new AmazonScraper();

      default:
        throw new Error(`Scraper for ${website} is not implemented`);
    }
  }
}

export default ScraperFactory;
