import { BasePage } from './basePage.js';
import { HomePage } from './homePage.js';
/** @typedef {import('@playwright/test').Page} Page */

export class ProductDetailPage extends BasePage{
    /**
   * @param {Page} page
   */
    constructor(page){
        /** @type {Page} */
        super(page);//why super bcuz we are extending basepage class here.
        //we can access all the methods of basepage class using super
        this.selectedProductName=page.locator("//div[@id='tbodyid']/h2");
        this.SelectedProductPrice=page.locator("//h3[@class='price-container']");
        this.selectedProductDiscription=page.locator("//div[@id='more-information']/p");
        this.addToCart=page.locator("//a[text()='Add to cart']");
        this.homepage=page.locator("(//div[@id='navbarExample']/ul/li/a)[1]");//this is to click on the home page
        this.expectedMessage="Product added."
    }

    async expectOnDetailspage(){
        await this.expectVisible(this.selectedProductName);
        await this.expectVisible(this.addToCart);
    }

    async expectDeviceName(expectedName){
        await this.expectText(this.selectedProductName,expectedName);
    }

    async expectDevicePriceVisible(){
        await this.expectVisible(this.SelectedProductPrice);
    }

    async expectDescriptionVisible() {
    await this.expectVisible(this.selectedProductDiscription);
    }

    async expectAddToCartEnabled() {
        await this.expectEnabled(this.addToCart);
    }

    async clickAddToCart() {
        await this.click(this.addToCart);
    }

    async ProductAddedAlert() {
        await this.handleAlert(this.expectedMessage);
    }

    async getDevicePrice(){
        return this.getNumericValue(this.SelectedProductPrice);
    }

    async ValidateAllInPDPPage(deviceName){
        await this.expectOnDetailspage();
        await this.expectDeviceName(deviceName);
        await this.expectDevicePriceVisible();
        await this.expectDescriptionVisible();
        await this.expectAddToCartEnabled();


    }

    async addProductToCart(){
        await this.waitForItemsToLoad(this.selectedProductName);//this is to wait for the product to load in the page
        //const price = await this.getDevicePrice();
        await this.clickAddToCart();
        await this.ProductAddedAlert();
        //return price;

    }

    async navigateBackHomePage(){

        await Promise.all([
        this.page.waitForURL('**/index.html', { timeout: 15000 }),
        this.click(this.homepage)
    ]);
       
        
    }

}