import { Given, Then } from '../../support/fixtures.js';
import { expect } from '@playwright/test';
import { apiTestData } from '../../data/api/apiTestData.js';

Given('I send a GET request to get all products', async ({ productApiService, sharedState }) => {
    sharedState.apiResponse = await productApiService.getAllProducts();
});

Given('I send a POST request to get products by category {string}', async ({ productApiService, sharedState }, category) => {
    sharedState.apiResponse = await productApiService.getProductsByCategory(category);
});

Given('I send a login request with valid credentials', async ({ authApiService, sharedState }) => {
    const { username, password } = apiTestData.validUser;
    sharedState.apiResponse = await authApiService.login(username, password);
});

Then('the response status code should be {int}', async ({ sharedState }, statusCode) => {
    expect(sharedState.apiResponse.status()).toBe(statusCode);
});

Then('the response should contain a list of products', async ({ sharedState }) => {
    const body = await sharedState.apiResponse.json();
    expect(body).toHaveProperty('Items');
    expect(body.Items.length).toBeGreaterThan(0);
});

Then('the response body should contain products', async ({ sharedState }) => {
    const body = await sharedState.apiResponse.json();
    expect(body).toHaveProperty('Items');
    expect(body.Items.length).toBeGreaterThan(0);
});

Then('the response should contain an auth token', async ({ sharedState }) => {
    const token = await sharedState.apiResponse.text();
    expect(token).toBeTruthy();
    expect(token).not.toBe('null');
});
