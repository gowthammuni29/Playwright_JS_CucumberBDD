import { setWorldConstructor } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { LoginPage } from '../pages/loginPage.js';
import { HomePage } from '../pages/homePage.js';
import { BasePage } from '../pages/basePage.js';
import { ProductDetailPage } from '../pages/productDetailPage.js';
import { CartPage } from '../pages/cartPage.js';



class CustomWorld {
  constructor() {
    // runtime to share across steps and fresh for each scenario.
    //if this value are shared accross multiple page method then we need to put in world.
    //if this is shared only within the page then world.types.d.ts should be enough.

    /** multiple device PDP validations */
    this.selectedProduct = [];

    /** single device PDP page validation */
    this.expectedDeviceName = '';

    /** for device and price validation */
    this.selectedProductAndPrice = [];
  }
  async init() {
    this.browser = await chromium.launch({ headless: false });

    this.context = await this.browser.newContext({
      storageState: 'auth.json'   // ← created by globalSetup
    });

    this.page = await this.context.newPage();

    // Page Objects
    this.loginPage = new LoginPage(this.page);
    this.homePage = new HomePage(this.page);
    this.basePage = new BasePage(this.page);
    this.productDetailPage = new ProductDetailPage(this.page);
    this.cartPage =new CartPage(this.page);
  }

  async cleanup() {
    await this.browser.close();
  }
}

setWorldConstructor(CustomWorld);
export { CustomWorld };