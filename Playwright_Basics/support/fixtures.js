import { test as base, createBdd } from 'playwright-bdd';
import { LoginPage } from '../pages/loginPage.js';
import { HomePage } from '../pages/homePage.js';
import { BasePage } from '../pages/basePage.js';
import { ProductDetailPage } from '../pages/productDetailPage.js';
import { CartPage } from '../pages/cartPage.js';
import { ProductApiService } from '../api/services/productApiService.js';
import { AuthApiService } from '../api/services/authApiService.js';
import { envConfig } from '../config/envConfig.js';

export const test = base.extend({
    // ── UI Fixtures ──────────────────────────────────────────────────────────
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

    // ── API Fixtures ──────────────────────────────────────────────────────────
    productApiService: async ({ request }, use) => {
        await use(new ProductApiService(request, envConfig.apiBaseURL));
    },
    authApiService: async ({ request }, use) => {
        await use(new AuthApiService(request, envConfig.apiBaseURL));
    },

    // ── Shared State ──────────────────────────────────────────────────────────
    sharedState: async ({}, use) => {
        await use({
            expectedDeviceName: '',
            selectedProduct: [],
            selectedProductAndPrice: [],
            apiResponse: null,
        });
    },
});

export const { Given, When, Then } = createBdd(test);
