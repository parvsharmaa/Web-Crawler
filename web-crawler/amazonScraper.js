import ScraperInterface from './scraperInterface.js';
import handleCookiesPopup from './utils/handleCookiesPopup.js';
import { WEB_URL } from './utils/const.js';

class AmazonScraper extends ScraperInterface {
  async scrape(page, searchPhrase, scrapeToPage) {
    try {
      console.log('Initiating Amazon scraping...');

      // Navigate to the Amazon homepage
      await page.goto(WEB_URL);

      // Handle the cookies popup
      await handleCookiesPopup(page);

      // Wait for the search input field to load
      await page.waitForSelector('#twotabsearchtextbox');

      // Enter the search phrase into the search input field
      await page.type('#twotabsearchtextbox', searchPhrase);

      // Click on the search button
      await page.click('#nav-search-submit-button');

      // Wait for the search results to load
      await page.waitForSelector('.s-widget-container');

      // Get the URL after the search
      const url = page.url();

      // Initialize an empty array to store scraped data
      const cardData = [];

      // Define recursive function to scrape each page of search results
      async function scrapePage(url, currentPage = 1, scrapeToPage = null) {
        console.log('Scraping page ' + currentPage + '...');

        // Stop scraping if the current page exceeds the target page
        if (scrapeToPage !== null && currentPage > scrapeToPage) {
          return;
        }

        // Navigate to the URL of the current page
        await page.goto(url);

        // Handle the cookies popup
        await handleCookiesPopup(page);

        // Wait for the search results to load
        await page.waitForSelector('.s-widget-container');

        // Evaluate the content of the page
        const pageCardData = await page.evaluate(() => {
          const cards = Array.from(
            document.querySelectorAll('.s-widget-container')
          );

          // Extract information from each search result card
          const cardInfo = cards
            .map((card) => {
              const productName = card.querySelector('h2')?.textContent.trim();
              const sponsoredTag = card.querySelector(
                '.puis-sponsored-label-text'
              );
              const sponsored = sponsoredTag ? 'yes' : 'no';
              const badgeElement = card.querySelector(
                'span.a-badge-label-inner'
              );
              const badge = badgeElement ? badgeElement.textContent : 'N/A';
              const priceElement = card.querySelector('.a-price .a-offscreen');
              const price = priceElement ? priceElement.textContent : 'N/A';
              const basePriceElement = card.querySelector(
                'span.a-price.a-text-price > span.a-offscreen'
              );
              const basePrice = basePriceElement
                ? basePriceElement.textContent
                : 'N/A';
              const ratingElement = card.querySelector(
                '.a-row > span:nth-child(1)[aria-label]'
              );
              const rating = ratingElement
                ? ratingElement.textContent.trim()
                : 'N/A';
              const ratingsNumberElement = card.querySelector(
                '.a-row > span:nth-child(2)[aria-label]'
              );
              const ratingsNumber = ratingsNumberElement
                ? ratingsNumberElement.textContent.trim()
                : 'N/A';
              const boughtPastMonthElement = card.querySelector(
                '.a-row.a-size-base > .a-size-base.a-color-secondary'
              );
              const boughtPastMonth = boughtPastMonthElement
                ? boughtPastMonthElement.textContent.trim()
                : 'N/A';

              /*
               need not to push sponsored products as 
               they can result in duplicates.
              */
              if (productName && sponsored !== 'yes') {
                return {
                  productName,
                  badge,
                  price,
                  basePrice,
                  rating,
                  ratingsNumber,
                  boughtPastMonth,
                };
              } else {
                return null;
              }
            })
            .filter((card) => card !== null);

          return cardInfo;
        });

        // Add the extracted data from the current page to the array
        cardData.push(...pageCardData);

        // Recursive call to scrape the next page if applicable
        if (scrapeToPage === null || currentPage < scrapeToPage) {
          const nextPageButton = await page.$('.s-pagination-next');
          if (nextPageButton) {
            const isDisabled = await page.evaluate(
              (btn) => btn.hasAttribute('aria-disabled'),
              nextPageButton
            );
            if (!isDisabled) {
              const nextPageUrl = encodeURI(
                await page.evaluate((nextBtn) => nextBtn.href, nextPageButton)
              );
              await scrapePage(nextPageUrl, currentPage + 1, scrapeToPage);
            } else {
              console.log('All available pages scraped:', currentPage);
            }
          } else if (!scrapeToPage || currentPage < scrapeToPage) {
            console.log('All available pages scraped:', currentPage);
          }
        }
      }

      // Start scraping from the first page
      await scrapePage(url, 1, scrapeToPage);

      console.log('Amazon scraping completed successfully.');
      return cardData;
    } catch (error) {
      console.error('An error occurred during Amazon scraping:', error);
    }
  }
}

export default AmazonScraper;
