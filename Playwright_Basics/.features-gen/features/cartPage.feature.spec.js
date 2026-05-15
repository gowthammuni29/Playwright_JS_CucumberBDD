// Generated from: features\cartPage.feature
import { test } from "../../support/fixtures.js";

test.describe('Cart Page Validations', () => {

  test.beforeEach('Background', async ({ Given, homePage }, testInfo) => { if (testInfo.error) return;
    await Given('user has storage state authentication and logged in', null, { homePage }); 
  });
  
  test('Validate product details in cart page', { tag: ['@sanity', '@regression'] }, async ({ When, Then, And, cartPage, homePage, productDetailPage, sharedState }) => { 
    await When('user selects device "Iphone 6 32gb"', null, { homePage, sharedState }); 
    await And('adds it to cart with alert message confirmation', null, { productDetailPage }); 
    await And('user navigate to the cart page', null, { cartPage }); 
    await Then('selected items are visible in cart page', null, { cartPage }); 
    await And('place order button should be enabled', null, { cartPage }); 
  });

  test('Validate remove device from Cart', { tag: ['@sanity', '@regression'] }, async ({ When, Then, And, cartPage, homePage, productDetailPage, sharedState }) => { 
    await When('user selects device "Iphone 6 32gb"', null, { homePage, sharedState }); 
    await And('adds it to cart with alert message confirmation', null, { productDetailPage }); 
    await And('user navigate to the cart page', null, { cartPage }); 
    await And('user clicked on remove button', null, { cartPage, sharedState }); 
    await Then('device cart should be empty', null, { cartPage }); 
  });

  test('Add multiple device to the cart and validate the total price', { tag: ['@sanity', '@regression'] }, async ({ When, Then, And, cartPage, homePage, productDetailPage, sharedState }) => { 
    await When('user adds the following devices to the cart:', {"dataTable":{"rows":[{"cells":[{"value":"deviceName"}]},{"cells":[{"value":"Samsung galaxy s6"}]},{"cells":[{"value":"Nokia lumia 1520"}]}]}}, { homePage, productDetailPage, sharedState }); 
    await And('user navigate to the cart page', null, { cartPage }); 
    await Then('cart should display all the products', null, { cartPage, sharedState }); 
    await And('cart total price should be equal to the sum of device price', null, { cartPage }); 
  });

  test('Validate the purchase form without required fields', async ({ When, And, cartPage, homePage, productDetailPage, sharedState }) => { 
    await When('user selects device "Iphone 6 32gb"', null, { homePage, sharedState }); 
    await And('adds it to cart with alert message confirmation', null, { productDetailPage }); 
    await And('user navigate to the cart page', null, { cartPage }); 
    await And('user clicked place order button', null, { cartPage }); 
    await And('user clicked purchase without updating the input field an alert should be shown', null, { cartPage }); 
  });

  test('User end to end device purchase', { tag: ['@sanity', '@regression'] }, async ({ When, Then, And, cartPage, homePage, productDetailPage, sharedState }) => { 
    await When('user selects device "Iphone 6 32gb"', null, { homePage, sharedState }); 
    await And('adds it to cart with alert message confirmation', null, { productDetailPage }); 
    await And('user navigate to the cart page', null, { cartPage }); 
    await And('user clicked place order button', null, { cartPage }); 
    await And('user fills the purchase details with valid information', null, { cartPage }); 
    await Then('order should be placed successfully with order confirmation message', null, { cartPage }); 
    await And('user completes the purhcase with selecting ok', null, { cartPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\cartPage.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":12,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":13,"keywordType":"Action","textWithKeyword":"When user selects device \"Iphone 6 32gb\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Iphone 6 32gb\"","children":[{"start":21,"value":"Iphone 6 32gb","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"And adds it to cart with alert message confirmation","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"And user navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":16,"keywordType":"Outcome","textWithKeyword":"Then selected items are visible in cart page","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"And place order button should be enabled","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":20,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":21,"keywordType":"Action","textWithKeyword":"When user selects device \"Iphone 6 32gb\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Iphone 6 32gb\"","children":[{"start":21,"value":"Iphone 6 32gb","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":22,"keywordType":"Action","textWithKeyword":"And adds it to cart with alert message confirmation","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":23,"keywordType":"Action","textWithKeyword":"And user navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":22,"gherkinStepLine":24,"keywordType":"Action","textWithKeyword":"And user clicked on remove button","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":25,"keywordType":"Outcome","textWithKeyword":"Then device cart should be empty","stepMatchArguments":[]}]},
  {"pwTestLine":26,"pickleLine":28,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","isBg":true,"stepMatchArguments":[]},{"pwStepLine":27,"gherkinStepLine":29,"keywordType":"Action","textWithKeyword":"When user adds the following devices to the cart:","stepMatchArguments":[]},{"pwStepLine":28,"gherkinStepLine":33,"keywordType":"Action","textWithKeyword":"And user navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":29,"gherkinStepLine":34,"keywordType":"Outcome","textWithKeyword":"Then cart should display all the products","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":35,"keywordType":"Outcome","textWithKeyword":"And cart total price should be equal to the sum of device price","stepMatchArguments":[]}]},
  {"pwTestLine":33,"pickleLine":38,"tags":[],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","isBg":true,"stepMatchArguments":[]},{"pwStepLine":34,"gherkinStepLine":39,"keywordType":"Action","textWithKeyword":"When user selects device \"Iphone 6 32gb\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Iphone 6 32gb\"","children":[{"start":21,"value":"Iphone 6 32gb","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":35,"gherkinStepLine":40,"keywordType":"Action","textWithKeyword":"And adds it to cart with alert message confirmation","stepMatchArguments":[]},{"pwStepLine":36,"gherkinStepLine":41,"keywordType":"Action","textWithKeyword":"And user navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":42,"keywordType":"Action","textWithKeyword":"And user clicked place order button","stepMatchArguments":[]},{"pwStepLine":38,"gherkinStepLine":43,"keywordType":"Action","textWithKeyword":"And user clicked purchase without updating the input field an alert should be shown","stepMatchArguments":[]}]},
  {"pwTestLine":41,"pickleLine":46,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","isBg":true,"stepMatchArguments":[]},{"pwStepLine":42,"gherkinStepLine":47,"keywordType":"Action","textWithKeyword":"When user selects device \"Iphone 6 32gb\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Iphone 6 32gb\"","children":[{"start":21,"value":"Iphone 6 32gb","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":43,"gherkinStepLine":48,"keywordType":"Action","textWithKeyword":"And adds it to cart with alert message confirmation","stepMatchArguments":[]},{"pwStepLine":44,"gherkinStepLine":49,"keywordType":"Action","textWithKeyword":"And user navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":45,"gherkinStepLine":50,"keywordType":"Action","textWithKeyword":"And user clicked place order button","stepMatchArguments":[]},{"pwStepLine":46,"gherkinStepLine":51,"keywordType":"Action","textWithKeyword":"And user fills the purchase details with valid information","stepMatchArguments":[]},{"pwStepLine":47,"gherkinStepLine":52,"keywordType":"Outcome","textWithKeyword":"Then order should be placed successfully with order confirmation message","stepMatchArguments":[]},{"pwStepLine":48,"gherkinStepLine":53,"keywordType":"Outcome","textWithKeyword":"And user completes the purhcase with selecting ok","stepMatchArguments":[]}]},
]; // bdd-data-end