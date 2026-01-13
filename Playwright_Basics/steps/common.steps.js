import { Given, When, Then } from '@cucumber/cucumber';
import { getWorld } from './helpers/world.helper.js';


Given('user has storage state authentication and logged in', async function () {
  const world = getWorld(this);
  await world.homePage.openHomePage();
});


Given('user in on the cart page', async function () {
  const world = getWorld(this);
  await world.cartPage.navigateToCartPage();
  
});



