// Generated from: features\e2epurchase.feature
import { test } from "../../support/fixtures.js";

test.describe('Device Purchase E2E', () => {

  test.beforeEach('Background', async ({ Given, homePage }, testInfo) => { if (testInfo.error) return;
    await Given('user has storage state authentication and logged in', null, { homePage }); 
  });
  
  test('User end to end device purchase', { tag: ['@smoke'] }, async ({ When, Then, And, cartPage, homePage, productDetailPage, sharedState }) => { 
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
  $uri: [({}, use) => use('features\\e2epurchase.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":13,"tags":["@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":14,"keywordType":"Action","textWithKeyword":"When user selects device \"Iphone 6 32gb\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Iphone 6 32gb\"","children":[{"start":21,"value":"Iphone 6 32gb","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"And adds it to cart with alert message confirmation","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And user navigate to the cart page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":17,"keywordType":"Action","textWithKeyword":"And user clicked place order button","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"And user fills the purchase details with valid information","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then order should be placed successfully with order confirmation message","stepMatchArguments":[]},{"pwStepLine":17,"gherkinStepLine":20,"keywordType":"Outcome","textWithKeyword":"And user completes the purhcase with selecting ok","stepMatchArguments":[]}]},
]; // bdd-data-end