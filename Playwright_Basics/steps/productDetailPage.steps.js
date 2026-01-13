import { Given, When, Then } from '@cucumber/cucumber';
import { _android, expect } from '@playwright/test';
import { getWorld } from './helpers/world.helper.js';

Then('selected product should be displayed on PDP Page', async function () {
    const world = getWorld(this);
    await world.productDetailPage.expectDeviceName(this.expectedDeviceName);

});

Then('product price should be displayed on PDP Page', async function () {
    const world = getWorld(this);
    await world.productDetailPage.expectDevicePriceVisible();
    
});

Then('product description should be displayed', async function () {
    const world = getWorld(this);
    await world.productDetailPage.expectDescriptionVisible();
    
});

Then('Add to Cart button enabled', async function () {
    const world = getWorld(this);
    await world.productDetailPage.expectAddToCartEnabled();
});

When('user clicks on Add to Cart button', async function () {
    const world= getWorld(this);
    await world.productDetailPage.clickAddToCart();
});

Then('Alert message should be displayed and to be accepted', async function(){
    const world = getWorld(this);
    await world.productDetailPage.ProductAddedAlert();
});


