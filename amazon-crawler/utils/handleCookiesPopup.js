/**
 * Function to handle cookies popup on Amazon
 * @param {Page} page - Puppeteer page object
 */
async function handleCookiesPopup(page) {
  const cookiesButton = await page.$('#sp-cc-accept');
  if (cookiesButton) {
    await cookiesButton.click();
  }
}

export default handleCookiesPopup;
