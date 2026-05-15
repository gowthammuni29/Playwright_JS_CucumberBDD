import { When, Then } from '../support/fixtures.js';

When('adds it to cart with alert message confirmation', async ({ productDetailPage }) => {
    await productDetailPage.clickAddToCart();
    await productDetailPage.ProductAddedAlert();
});

When('user navigate to the cart page', async ({ cartPage }) => {
    await cartPage.navigateToCartPage();
});

Then('selected items are visible in cart page', async ({ cartPage }) => {
    await cartPage.validateAllItemsAreVisible();
});

Then('place order button should be enabled', async ({ cartPage }) => {
    await cartPage.expectPlaceOrderEnabled();
});

When('user clicked on remove button', async ({ cartPage, sharedState }) => {
    await cartPage.removeItemFromCart(sharedState.expectedDeviceName);
});

Then('device cart should be empty', async ({ cartPage }) => {
    await cartPage.ValidateCartIsEmpty();
});

When('user adds the following devices to the cart:', async ({ homePage, productDetailPage, sharedState }, dataTable) => {
    const devices = dataTable.hashes();
    for (const row of devices) {
        await homePage.selectDevice(row.deviceName);
        await productDetailPage.addProductToCart();
        sharedState.selectedProduct.push(row.deviceName);
        await productDetailPage.navigateBackHomePage();
    }
});

Then('cart should display all the products', async ({ cartPage, sharedState }) => {
    await cartPage.ValidateProductInCart(sharedState.selectedProduct);
});

Then('cart total price should be equal to the sum of device price', async ({ cartPage }) => {
    await cartPage.validateDevicePriceWithCartTotal();
});

When('user clicked place order button', async ({ cartPage }) => {
    await cartPage.clickPlaceOrder();
});

When('user clicked purchase without updating the input field an alert should be shown', async ({ cartPage }) => {
    await cartPage.clickPurchaseButton();
    await cartPage.submitPurchaseWithoutData();
});

When('user fills the purchase details with valid information', async ({ cartPage }) => {
    await cartPage.fillPurchaseForm();
});

Then('order should be placed successfully with order confirmation message', async ({ cartPage }) => {
    await cartPage.ValidatePurchaseSuccessMessage();
});

Then('user completes the purhcase with selecting ok', async ({ cartPage }) => {
    await cartPage.clickPurchaseSuccessOKButton();
});
