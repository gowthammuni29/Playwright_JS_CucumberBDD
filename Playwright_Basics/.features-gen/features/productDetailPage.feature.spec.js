// Generated from: features\productDetailPage.feature
import { test } from "../../support/fixtures.js";

test.describe('Product Detail Page Validations', () => {

  test.beforeEach('Background', async ({ Given, homePage }, testInfo) => { if (testInfo.error) return;
    await Given('user has storage state authentication and logged in', null, { homePage }); 
  });
  
  test('Validate the Selected Product Details', { tag: ['@sanity', '@regression'] }, async ({ When, Then, And, homePage, productDetailPage, sharedState }) => { 
    await When('user selects device "Iphone 6 32gb"', null, { homePage, sharedState }); 
    await Then('selected product should be displayed on PDP Page', null, { productDetailPage, sharedState }); 
    await And('product price should be displayed on PDP Page', null, { productDetailPage }); 
    await And('product description should be displayed', null, { productDetailPage }); 
    await And('Add to Cart button enabled', null, { productDetailPage }); 
  });

  test('Add product to cart from PDP', { tag: ['@sanity', '@regression', '@addToCart'] }, async ({ When, Then, And, homePage, productDetailPage, sharedState }) => { 
    await When('user selects device "Iphone 6 32gb"', null, { homePage, sharedState }); 
    await And('user clicks on Add to Cart button', null, { productDetailPage }); 
    await Then('Alert message should be displayed and to be accepted', null, { productDetailPage }); 
  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\productDetailPage.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":10,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Action","textWithKeyword":"When user selects device \"Iphone 6 32gb\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Iphone 6 32gb\"","children":[{"start":21,"value":"Iphone 6 32gb","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Outcome","textWithKeyword":"Then selected product should be displayed on PDP Page","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"And product price should be displayed on PDP Page","stepMatchArguments":[]},{"pwStepLine":14,"gherkinStepLine":14,"keywordType":"Outcome","textWithKeyword":"And product description should be displayed","stepMatchArguments":[]},{"pwStepLine":15,"gherkinStepLine":15,"keywordType":"Outcome","textWithKeyword":"And Add to Cart button enabled","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":18,"tags":["@sanity","@regression","@addToCart"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":19,"keywordType":"Action","textWithKeyword":"When user selects device \"Iphone 6 32gb\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Iphone 6 32gb\"","children":[{"start":21,"value":"Iphone 6 32gb","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":20,"keywordType":"Action","textWithKeyword":"And user clicks on Add to Cart button","stepMatchArguments":[]},{"pwStepLine":21,"gherkinStepLine":21,"keywordType":"Outcome","textWithKeyword":"Then Alert message should be displayed and to be accepted","stepMatchArguments":[]}]},
]; // bdd-data-end