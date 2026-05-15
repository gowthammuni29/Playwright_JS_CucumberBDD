import { When, Then } from '../support/fixtures.js';

Then('selected product should be displayed on PDP Page', async ({ productDetailPage, sharedState }) => {
    await productDetailPage.expectDeviceName(sharedState.expectedDeviceName);
});

Then('product price should be displayed on PDP Page', async ({ productDetailPage }) => {
    await productDetailPage.expectDevicePriceVisible();
});

Then('product description should be displayed', async ({ productDetailPage }) => {
    await productDetailPage.expectDescriptionVisible();
});

Then('Add to Cart button enabled', async ({ productDetailPage }) => {
    await productDetailPage.expectAddToCartEnabled();
});

When('user clicks on Add to Cart button', async ({ productDetailPage }) => {
    await productDetailPage.clickAddToCart();
});

Then('Alert message should be displayed and to be accepted', async ({ productDetailPage }) => {
    await productDetailPage.ProductAddedAlert();
});
