import { Given, When, Then } from '@cucumber/cucumber';
import {  expect } from '@playwright/test';
import { getWorld } from './helpers/world.helper.js';
import logger from '../helpers/logger.js';



When('adds it to cart with alert message confirmation', async function(){
    const world = getWorld(this);
    await world.productDetailPage.clickAddToCart();
    await world.productDetailPage.ProductAddedAlert();
    
});

When('user navigate to the cart page', async function(){
    const world = getWorld(this);
    await world.cartPage.navigateToCartPage();
});

Then('selected items are visible in cart page', async function () {
    const world= getWorld(this);
    await world.cartPage.validateAllItemsAreVisible();
});

Then('place order button should be enabled', async function () {
    const world= getWorld(this);
    await world.cartPage.expectPlaceOrderEnabled();
});

When('user clicked on remove button', async function(){
    const world= getWorld(this);
    await world.cartPage.removeItemFromCart(this.expectedDeviceName);
});

Then('device cart should be empty', async function(){
    const world= getWorld(this);
    await world.cartPage.ValidateCartIsEmpty();
});

When('user adds the following devices to the cart:', async function (dataTable){

    const world = getWorld(this);
    const devices = dataTable.hashes();

    for (let row of devices){
        await world.homePage.selectDevice(row.deviceName);

        // const price = await world.productDetailPage.addProductToCartAndGetPrice();

        // world.selectedProductAndPrice.push({
        //     name: row.deviceName,
        //     price: price
        // });
        await world.productDetailPage.addProductToCart(); // add product to cart
        world.selectedProduct.push(row.deviceName); 
        

        await world.productDetailPage.navigateBackHomePage(); // navigate back to home page to select next device

    }
});

Then('cart should display all the products', async function () {
    const world= getWorld(this);
    await world.cartPage.ValidateProductInCart(world.selectedProduct);
    
});

Then('cart total price should be equal to the sum of device price', async function(){

    const world= getWorld(this);
    await world.cartPage.validateDevicePriceWithCartTotal();
});

When('user clicked place order button', async function(){
    const world= getWorld(this);
    await world.cartPage.clickPlaceOrder();
});

When('user clicked purchase without updating the input field an alert should be shown', async function () {
    const world =getWorld(this);
    await world.cartPage.clickPurchaseButton();
    await world.cartPage.submitPurchaseWithoutData();
    
});

When('user fills the purchase details with valid information', async function () {
    const world =getWorld(this);
    await world.cartPage.fillPurchaseForm();
});

Then('order should be placed successfully with order confirmation message', async function () {
    const world =getWorld(this);
    await world.cartPage.ValidatePurchaseSuccessMessage();
   

});

Then('user completes the purhcase with selecting ok', async function () {
    const world =getWorld(this);
    await world.cartPage.clickPurchaseSuccessOKButton();
});

