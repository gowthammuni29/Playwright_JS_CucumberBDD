import { expect } from '@playwright/test';
import { BasePage } from './basePage.js';
import logger from '../helpers/logger.js';
import { ORDER_DETAILS } from '../tests/utils/phones.data.js';
/** @typedef {import('@playwright/test').Page} Page */



export class CartPage extends BasePage{
    /**
   * @param {Page} page
   */
    constructor(page){
        /** @type {Page} */
        super(page);//why super bcuz we are extending basepage class here.
        //we can access all the methods of basepage class using super
        this.hompagetabs=page.locator("//div[@id='navbarExample']/ul/li/a");
        this.cartPage="https://demoblaze.com/cart.html";
        this.cartItemRows=page.locator("//tr[@class='success']");
        this.cartDeviceName=page.locator("//tr[@class='success']/td[2]");
        this.cartPrices=page.locator("//tr[@class='success']/td[3]");
        this.cartTotal=page.locator("//h3[@id='totalp']");
        this.cartDelete=page.locator("//tr[@class='success']/td[4]/a");
        this.placeOrder=page.locator("//button[@class='btn btn-success']");

        //purchase locators
        this.nameInput=page.locator("//input[@id='name']");
        this.countryInput=page.locator("//input[@id='country']");
        this.cityInput=page.locator("//input[@id='city']");
        this.creditCardInput=page.locator("//input[@id='card']");
        this.monthInput=page.locator("//input[@id='month']");
        this.yearInput=page.locator("//input[@id='year']");
        this.purchaseButton=page.locator("//button[text()='Purchase']");
        this.alertMessage="Please fill out Name and Creditcard.";
        this.purchaseConfirmation=page.locator("//h2[text()='Thank you for your purchase!']");

        //Success message locators
        this.successMessage=page.locator("//div[@class='sa-icon sa-custom']/following-sibling::h2");
        this.successButton=page.locator("//div/div/button[text()='OK']");
        this.successPurchaseMessage= "Thank you for your purchase!";
        
        //purchase Details locators
        this.purchaseDetails= page.locator("//p[@class='lead text-muted ']");  
        this.purchaseDetailsCard = page.locator("//p[@class='lead text-muted']/text()[contains( .,'Card')]");  
        this.purchaseDetailsName = page.locator("//p[@class='lead text-muted']/text()[contains( .,'Name')]");

    }


    //ACTIONS
    async navigateToCartPage(){
        await this.selectTextInList(this.hompagetabs,'Cart');
        await this.waitForItemsToLoad(this.cartItemRows);//this is to wait for the cart items to load
    }
    async clickPlaceOrder(){
        await this.click(this.placeOrder);
    }

    async removeItemFromCart(deviceName){
        const selectedDevice=this.cartItemRows.filter({hasText: deviceName});
        await this.expectVisible(selectedDevice);

        const deleteDevice=selectedDevice.getByRole('link', { name: 'Delete' });
        await this.expectVisible(deleteDevice);
        await this.click(deleteDevice);
        await expect(selectedDevice).toHaveCount(0); //this is to validate that the device is removed from the cart
    }

    async removeAllProductsFromCart(){
        await this.removeAllItems(this.cartDelete);//this is to remove all the items from the cart
    }

    
    
    async getItemsTitles(){
        this.getAllText(this.cartDeviceName);
    }

    //ASSERTIONS
    async validateItemPresent(){
        await this.expectItemsPresent(this.cartDeviceName);
    }

    async expectPlaceOrderEnabled(){
        await this.expectEnabled(this.placeOrder);
    }

    async validateAllItemsAreVisible(){
        await this.waitForItemsToLoad(this.cartItemRows);
        await this.expectAllItemsAreVisible(this.cartDeviceName);
        await this.expectAllItemsAreVisible(this.cartPrices);
        await this.expectVisible(this.cartTotal);
    }

    async validateDevicePriceWithCartTotal(){
        const devicesTotal=await this.getSumNumericValues(this.cartPrices);
        const cartTotal=await this.getNumericValue(this.cartTotal);
        this.expectedEqual(devicesTotal,cartTotal);
    }

    async ValidateCartIsEmpty(){
        await this.expectCount(this.cartItemRows,0);//this is to validate that the cart is empty
    }

    async ValidateProductInCart(deviceName){
        await this.expectItemsVisibleinList(this.cartDeviceName,deviceName);
    }

    async fillPurchaseForm(){
        await this.fill(this.nameInput,ORDER_DETAILS.name);
        await this.fill(this.countryInput,ORDER_DETAILS.country);
        await this.fill(this.cityInput,ORDER_DETAILS.city);
        await this.fill(this.creditCardInput,ORDER_DETAILS.creditCard);
        await this.fill(this.monthInput,ORDER_DETAILS.month);
        await this.fill(this.yearInput,ORDER_DETAILS.year);
        await this.clickPurchaseButton();//this is to click the purchase button
    }

    async PurchaseAlert(){
        await this.handleAlert(this.alertMessage);
    }

    async clickPurchaseButton(){
        await this.waitForItemsToLoad(this.purchaseButton);
        await this.click(this.purchaseButton);
    }
    async submitPurchaseWithoutData() {

       await this.handleAlertsCartPage(this.purchaseButton, this.alertMessage);

    }

    async ValidatePurchaseSuccessMessage(){
        
        await this.expectText(this.successMessage,this.successPurchaseMessage);
        await this.expectTexNodes(this.purchaseDetails, ORDER_DETAILS.name);
        await this.expectTexNodes(this.purchaseDetails, ORDER_DETAILS.creditCard);
    }

    async clickPurchaseSuccessOKButton(){
    
        await this.click(this.successButton);
    }
}  
 