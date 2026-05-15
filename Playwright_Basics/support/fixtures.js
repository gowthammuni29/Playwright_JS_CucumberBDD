import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/loginPage.js';
import { HomePage } from '../pages/homePage.js';
import { BasePage } from '../pages/basePage.js';
import { ProductDetailPage } from '../pages/productDetailPage.js';
import { CartPage } from '../pages/cartPage.js';

export const test = base.extend({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    sharedState: async ({}, use) => {
        await use({
            expectedDeviceName: '',
            selectedProduct: [],
            selectedProductAndPrice: [],
        });
    },
});

export const { Given, When, Then } = createBdd(test);
