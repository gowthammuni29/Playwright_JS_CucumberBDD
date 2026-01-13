/**
 * @typedef {import('@playwright/test').Locator} Locator
 */
/** @typedef {import('@playwright/test').Page} Page */
import { expect } from '@playwright/test';
import logger from '../helpers/logger.js';
import path from 'path';
import { text } from 'stream/consumers';

export class BasePage {
    /**
   * @param {Page} page
   */
  
  constructor(page) {
     /** @type {Page} */
     if (!page) {
      throw new Error('Page instance is required for BasePage');
    }
      this.page = page;
      logger.info('BasePage Initialized');
  }


  /* ==========================
     NAVIGATION METHODS
     ========================== */
  /**
   * @param {String} url
   */
  async navigate(url) {
    logger.info(`Navigate to URL: ${url}`);
    await this.page.goto(url);
  }

  /**
   * @param {String} value
   */
  async navigateUrlContains(value){
    logger.info(`Waiting for URL to contain: ${value}`);
    await expect(this.page).toHaveURL(new RegExp(value));
  }

  async getPageTitle() {
    logger.info('Getting Page Title');
    return await this.page.title();
  }

  /* ==========================
     ACTION METHODS
     ========================== */
  /**
   * @param {Locator} locator
   */
  async click(locator,stepName='Click Element') {
    try{
      logger.info(`ACTION -> CLICKING: ${stepName}`);
      await expect(locator).toBeVisible();
      await expect(locator).toBeEnabled();
      await locator.click();
    }catch(error){
      logger.error(`ERROR: ${stepName}`);
      await this.captureScreenshot('Click Failed');
      throw error;
    }
    
  }

  /**
   * @param {Locator} locator
   * @param {string} text
   */
  async fill(locator, text, stepName='Fill Input') {
    try{
      logger.info(`ACTION -> FILL : ${stepName} --> ${text}`);
      await expect(locator).toBeVisible();
      await locator.fill(text);
      logger.info(`SUCCESS: ${stepName}`);
    }catch(error){
      logger.error(`FAILED: ${stepName}`, error);
      await this.captureScreenshot('fill-failed');
      throw error;
    }
    
  }

  /**
   * @param {Locator} locator
   */
  async hover(locator, stepName= 'Hover Element'){
    try{logger.info(`ACTION -> HOVER: ${stepName}`);
    await expect(locator).toBeVisible();
    await locator.hover();
    logger.info(`SUCCESS: ${stepName}`);
    }catch(error){
      logger.error(`FAILED: ${stepName}`, error);
      throw error;
    }
  }

  /**
   * @param {Locator} locator
   */
  async clear(locator, stepName='Clear Input') {
    try{
      logger.info(`ACTION -> CLEAR: ${stepName}`);
      await expect(locator).toBeVisible();
      await locator.fill('');
    }catch(error){
      logger.error(`FAILED: ${stepName}`, error);
      throw error;
    }
    
  }


  

  
  

  /* ==========================
     DROPDOWNS /PAGINATION
     ========================== */
 
  /**
   * @param {Locator} locator
   * @param {string} tabName
   */
  //single page locators
  async selectTextInList(locator,tabName){
    logger.info(`SELECT : ${tabName} `)
    const item=locator.filter({hasText: tabName });
    await item.waitFor({ state: 'visible' });
    const count=await item.count(); 
    if(count==0){
      throw new Error(` Text "${tabName}" not found in list`);
    }
    await item.click();
    logger.info(`Selected Name: ${tabName}`);

  }

  
  

  /**
   * Click an item across pagination pages
   *
   * @param {Locator} locator - locator matching all items on a page
   * @param {string} textToSelect - visible text of the item to click
   * @param {Locator} nextButtonLocator - locator for "Next" pagination button
   */
  async clickItemAcrossPages(locator, nextButtonLocator,textToSelect) {
    logger.info(`Searching for item across pages: ${textToSelect}`);
    // Initial wait (VERY IMPORTANT)
    await expect(locator.first()).toBeVisible({ timeout: 15000 });
    while(true){
      
      const textSelected=locator.filter({hasText:textToSelect});

      if(await textSelected.count()>0){
        await textSelected.first().click();
        logger.info(`Item clicked: ${textToSelect}`);
        return;
      }
      if (!(await nextButtonLocator.isVisible()) || !(await nextButtonLocator.isEnabled())) {
        throw new Error(`Item "${textToSelect}" not found across pages`);
      }
      const firstItemTextBefore = await locator.first().textContent();
      
      await nextButtonLocator.click();
      logger.info('Navigating to next page');
      //WAIT FOR UI CHANGE,
      await expect(locator.first()).not.toHaveText(firstItemTextBefore, {
      timeout: 15000
      });
    
    }

    }

   /* ==========================
     UTILITIES
     ========================== */  

    /**
   * @param {Locator} locator
   * @param {string} tabName
   */
  async getTextInList(locator,tabName){
    const selectedTab=locator.filter({hasText:tabName}).first();
    return await selectedTab.textContent();

  }

  /**
   * @param {Locator} locator
   */
  async getText(locator) {
    logger.info("Getting text from the element");
    return await locator.textContent();
  }

/**
   * @param {Locator} locator
   */
  async getAllText(locator) {
    logger.info("Getting text from the element");
    return await locator.allTextContents();
  }

  /**
   * @param {Locator} locator
   */
  async isVisible(locator) {
    logger.info("Element is Visible");
    return await locator.isVisible();
  }

  /**
   * @param {Locator} locator
   */
  async isEnabled(locator) {
    logger.info("Element is enabled");
    return await locator.isEnabled();
  }

  async getCartItemCount(locator) {
  return await locator.count();
}


  /* ---------- ASSERTION HELPERS ---------- */

  

  /**
   * Assert element is visible
   * @param {Locator} locator
   */
  async expectVisible(locator) {
    await expect(locator).toBeVisible({timeout: 5000});
  }

  /**
   * Assert element contains text
   * @param {Locator} locator
   * @param {string} text
   */
  async expectText(locator, text) {
    await expect(locator).toContainText(text);
  }

  /**
   * Assert Test nodes element contains text
   * @param {Locator} locator
   * @param {string} text
   */
  async expectTexNodes(locator, text) { 
    const textContent = await locator.textContent();
    expect(textContent).toContain(text);
  }


  /**
   * @param {Locator} locator
   * @param {string} itemName
   */
  async expectItemVisibleInList(locator,itemName){
    await this.waitForVisible(locator);
    const selectedItem=locator.filter({hasText:itemName}).first();
    await this.expectVisible(selectedItem);
  }

  /**
   * @param {Locator} locator
   * @param {string} itemNames
   */
  async expectItemsVisibleinList(locator,itemNames){
    await expect(locator.first()).toBeVisible({ timeout: 15000 });
    const actualNames=await locator.allTextContents();
    for(const name of itemNames){
      expect(actualNames).toContain(name);
      
    }

  }

   /**
   * @param {Locator} locator
   * @param {string} tabName
   */
  async expectTextInList(locator,tabName){
    await this.waitForVisible(locator);
    const selectedTab=locator.filter({hasText:tabName}).first();;
    const selectedInnerText=await selectedTab.textContent();
    await expect(selectedInnerText).toContain(tabName);

  };

   /**
    * Returns sum of numeric values from a locator- example calculating cart total
    * @param {Locator} locator
    */
  async getSumNumericValues(locator){
    const texts=await locator.allTextContents();
    const numbers=await texts.map(text=>Number(text.replace(/[^\d]/g, '').trim()));
    return numbers.reduce((sum,value)=>sum+value,0);
  }
  /**
    * Returns Numeric values from a locator- cart price which is string converts to Number
    * @param {Locator} locator
    */
  async getNumericValue(locator){
    const text=await locator.textContent();
    return Number(text.replace(/[^\d]/g, '').trim());
  }
  


  /**
   * Assert element count
   * @param {Locator} locator
   * @param {number} count
   */
  async expectCount(locator, count) {
    await expect(locator,`Item count mismatch`).toHaveCount(count);
  }

  /**
   * Assert elements present
   * @param {Locator} itemsLocator
   */
  async expectItemsPresent(itemsLocator) {
    const count = await itemsLocator.count();

    expect(count,`Items expected to be present, but found ${count}`).toBeGreaterThan(0);
  }

  /**
   * Assert elements visible
   * @param {Locator} itemsLocator
   */
  async expectAllItemsAreVisible(itemsLocator){
    const count = await itemsLocator.count();
    logger.info(`Number of devices found: ${count}`);
    expect(count, `$items not found`).toBeGreaterThan(0);

    for(let i=0;i<count;i++){
      expect(itemsLocator.nth(i),`items at index ${i} not visible`).toBeVisible();
    }
  }
  /**
   * Assert elements visible
   * @param {Locator} itemsLocator
   */
  async removeAllItems(itemsLocator){
        const delCount=await itemsLocator.count();
        for(let i=0;i<delCount;i++){
            await itemsLocator.first().nth(i).click();
        }
    }

  /**
   * assert elements contains text
   * @param {Locator} itemsLocator
   * @param {string} expectedText
   */

  async expectedItemsContainText(itemsLocator, expectedText){
    const actualTexts=await itemsLocator.allTextContents();
    for(const text of expectedText){
      expect(actualTexts,`items missing text: ${text}`).toContain(text);
    }
  }


  /**
   * Assert element is enabled
   * @param {Locator} locator
   */
  async expectEnabled(locator) {
    await expect(locator).toBeEnabled();
  }

  /**
   * Assert element is hidden
   * @param {Locator} locator
   */
  async expectHidden(locator) {
    await expect(locator).toBeHidden();
  }

  /**
   * Assert element are equal
   * @param {Number} actualvalue
   * @param {Number} expectedvalue
   */
  async expectedEqual(actualvalue,expectedvalue){
    await expect(actualvalue).toEqual(expectedvalue);
  }
  
  /* ==========================
     ALERT / DIALOG HANDLING
     ========================== */
  /**
   * Handle and assert alert dialog
   * @param {string} expectedMessage
   */
  async handleAlert(expectedMessage) {
    const dialog = await this.page.waitForEvent('dialog');

    logger.info(`Alert message: ${dialog.message()}`);

    if (expectedMessage) {
    expect(dialog.message()).toContain(expectedMessage);
    }

    await dialog.accept();
  }

   /**
   * Assert element is hidden
   * @param {Locator} locator
   */ 
  async handleAlertsCartPage(locator,expectedMessage) {
    let alertHandled = false;

        this.page.on('dialog', async dialog => {
        alertHandled = true;

        const message = dialog.message();
        logger.info(`ALERT MESSAGE: ${message}`);

        expect(message).toContain(expectedMessage);

        await dialog.accept();
        });

        // 🔥 CLICK MUST BE RAW — NO WRAPPER
        await locator.click();

        // 🔥 Explicit wait to ensure alert was handled
        await this.page.waitForFunction(() => true, { timeout: 100 });

        if (!alertHandled) {
            throw new Error('Alert was not handled');
        }
    }
  


/* ==========================
     SCREENSHOT & DEBUG
     ========================== */

  async captureScreenshot(name) {
    const path = `screenshots/${name}-${Date.now()}.png`;
    await this.page.screenshot({ path, fullPage: true });
    logger.info(` Screenshot captured: ${path}`);
  }

  async logCurrentURL() {
    logger.info(`Current URL: ${this.page.url()}`);
  }

/* ==========================
     WAIT METHODS
     ========================== */


  /**
   * @param {Locator} locator
   */   
  async waitForVisible(locator, timeout = 4000) {
    await expect(locator).toBeVisible({ timeout });
  }

  /**
   * @param {Locator} locator
   */  
  async waitForHidden(locator, timeout = 30000) {
    await expect(locator).toBeHidden({ timeout });
  }

  /**
   * @param {Locator} locator
   */  
  async waitForEnabled(locator) {
    await expect(locator).toBeEnabled();
  }


   /**
   * @param {Locator} itemsLocator
   */
  //this wait is very important after selecting some category. its needs some wait to reload with new selected category.  
  async waitForItemsToLoad(itemsLocator) {
    logger.info('Waiting for items to load after category selection');

  // Wait until at least one item is visible
    await expect(itemsLocator.first()).toBeVisible({ timeout: 15000 });

  // Ensure text is not empty (API completed)
    await expect(itemsLocator.first()).not.toHaveText('', {
    timeout: 15000
  });
}
  /**
   * @param {Locator} itemsLocator
   */
  async waitsHomepageToLoad(itemsLocator) {
    logger.info('Waiting for Home page to load');
    await expect(itemsLocator.first()).toBeVisible({ timeout: 15000 });
    await expect(itemsLocator.first()).toContainText('', {timeout: 15000 });
  }


  /**
   * @param {string} expectedItems
   */

   /**
   * @param {Locator} itemsLocator
   */
  async validateDisplayedItemsMatchExpected(itemsLocator, expectedItems) {
    
    try{
      logger.info("Validation of displayed items");
      const uiItems=[];
      const count = await itemsLocator.count();
      logger.info(`Number of items displayed: ${count}`);
      expect(count).toBeGreaterThan(0);

      for (let i=0;i<count; i++){
        const text =(await itemsLocator.nth(i).innerText()).trim();
        logger.info(`UI item found: ${text}`);
        uiItems.push(text);
      }
      // Validate unexpected items
       for (const item of uiItems){
         if(!expectedItems.includes(item)){
           throw new Error(`Unexpected item found: ${item}`);
        }
        expect(expectedItems).toContain(item);
       }
      // Validate missing items
      for(const item of expectedItems){
        if(!uiItems.includes(item)){
          throw new Error(`Missing item: ${item}`);
        }
        expect(uiItems).toContain(item);
      }
      logger.info('Validation completed successfully');
    }catch(error){
      logger.error(`Validation failed: ${error.message}`);
      throw error;
    }

  }

}