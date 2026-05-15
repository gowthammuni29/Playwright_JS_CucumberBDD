import { When, Then } from '../support/fixtures.js';

When('user selects category {string}', async ({ homePage }, category) => {
    await homePage.selectCateogry(category);
});

Then('phones details only should show on the Page', async ({ homePage }) => {
    await homePage.validatedisplayedItems();
});

When('user selects device {string}', async ({ homePage, sharedState }, deviceName) => {
    await homePage.selectDevice(deviceName);
    sharedState.expectedDeviceName = deviceName;
    sharedState.selectedProduct.push(deviceName);
});

Then('Selected device detail should show on the PDP Page', async ({ productDetailPage, sharedState }) => {
    await productDetailPage.expectDeviceName(sharedState.expectedDeviceName);
});
