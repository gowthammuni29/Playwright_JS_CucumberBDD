import { Given } from '../support/fixtures.js';

Given('user has storage state authentication and logged in', async ({ homePage }) => {
    await homePage.openHomePage();
});

Given('user in on the cart page', async ({ cartPage }) => {
    await cartPage.navigateToCartPage();
});
