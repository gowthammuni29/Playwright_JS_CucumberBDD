import { Given, When, Then } from '@cucumber/cucumber';
import {  expect } from '@playwright/test';
import { getWorld } from './helpers/world.helper.js';





When('user selects category {string}', async function (category) {
  const world = getWorld(this);
  await world.homePage.selectCateogry(category);
});

Then('phones details only should show on the Page',async function () {
  const world = getWorld(this);
  await world.homePage.validatedisplayedItems();
}); 

When('user selects device {string}', async function(deviceName) {
  const world = getWorld(this);
  await world.homePage.selectDevice(deviceName);
  //Storig the deviceName here for later use --> this expectedDeviceName i created in word.types.d.ts
  //Single device allocated to expectedDeviceName
  this.expectedDeviceName=deviceName;

  //when multiple device selected and validation on cartPage. (this is specific to multiple device validation on cart page)
  // adding device name to string array for validation created in word.types.d.ts;
  this.selectedProduct.push(deviceName);
});

Then('Selected device detail should show on the PDP Page',async function () {
  const world = getWorld(this);
  await world.productDetailPage.expectDeviceName(this.expectedDeviceName);
});