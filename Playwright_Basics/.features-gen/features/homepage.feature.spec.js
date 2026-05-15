// Generated from: features\homepage.feature
import { test } from "../../support/fixtures.js";

test.describe('Home Page Device Selection', () => {

  test('Select Phones Category Tab', { tag: ['@sanity', '@regression'] }, async ({ Given, When, Then, homePage }) => { 
    await Given('user has storage state authentication and logged in', null, { homePage }); 
    await When('user selects category "Phones"', null, { homePage }); 
    await Then('phones details only should show on the Page', null, { homePage }); 
  });

  test.describe('Select different Devices from Phones Category', () => {

    test('Example #1', { tag: ['@sanity', '@regression'] }, async ({ Given, When, Then, And, homePage, productDetailPage, sharedState }) => { 
      await Given('user has storage state authentication and logged in', null, { homePage }); 
      await When('user selects category "Phones"', null, { homePage }); 
      await And('user selects device "Samsung galaxy s6"', null, { homePage, sharedState }); 
      await Then('Selected device detail should show on the PDP Page', null, { productDetailPage, sharedState }); 
    });

    test('Example #2', { tag: ['@sanity', '@regression'] }, async ({ Given, When, Then, And, homePage, productDetailPage, sharedState }) => { 
      await Given('user has storage state authentication and logged in', null, { homePage }); 
      await When('user selects category "Phones"', null, { homePage }); 
      await And('user selects device "Nexus 6"', null, { homePage, sharedState }); 
      await Then('Selected device detail should show on the PDP Page', null, { productDetailPage, sharedState }); 
    });

    test('Example #3', { tag: ['@sanity', '@regression'] }, async ({ Given, When, Then, And, homePage, productDetailPage, sharedState }) => { 
      await Given('user has storage state authentication and logged in', null, { homePage }); 
      await When('user selects category "Phones"', null, { homePage }); 
      await And('user selects device "Iphone 6 32gb"', null, { homePage, sharedState }); 
      await Then('Selected device detail should show on the PDP Page', null, { productDetailPage, sharedState }); 
    });

    test('Example #4', { tag: ['@sanity', '@regression'] }, async ({ Given, When, Then, And, homePage, productDetailPage, sharedState }) => { 
      await Given('user has storage state authentication and logged in', null, { homePage }); 
      await When('user selects category "Phones"', null, { homePage }); 
      await And('user selects device "Sony xperia z5"', null, { homePage, sharedState }); 
      await Then('Selected device detail should show on the PDP Page', null, { productDetailPage, sharedState }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\homepage.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":6,"pickleLine":7,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":7,"gherkinStepLine":8,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","stepMatchArguments":[]},{"pwStepLine":8,"gherkinStepLine":9,"keywordType":"Action","textWithKeyword":"When user selects category \"Phones\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Phones\"","children":[{"start":23,"value":"Phones","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":9,"gherkinStepLine":10,"keywordType":"Outcome","textWithKeyword":"Then phones details only should show on the Page","stepMatchArguments":[]}]},
  {"pwTestLine":14,"pickleLine":20,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":15,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","stepMatchArguments":[]},{"pwStepLine":16,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When user selects category \"Phones\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Phones\"","children":[{"start":23,"value":"Phones","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":17,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And user selects device \"Samsung galaxy s6\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Samsung galaxy s6\"","children":[{"start":21,"value":"Samsung galaxy s6","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":18,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Selected device detail should show on the PDP Page","stepMatchArguments":[]}]},
  {"pwTestLine":21,"pickleLine":21,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":22,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","stepMatchArguments":[]},{"pwStepLine":23,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When user selects category \"Phones\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Phones\"","children":[{"start":23,"value":"Phones","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":24,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And user selects device \"Nexus 6\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Nexus 6\"","children":[{"start":21,"value":"Nexus 6","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":25,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Selected device detail should show on the PDP Page","stepMatchArguments":[]}]},
  {"pwTestLine":28,"pickleLine":22,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":29,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","stepMatchArguments":[]},{"pwStepLine":30,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When user selects category \"Phones\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Phones\"","children":[{"start":23,"value":"Phones","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":31,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And user selects device \"Iphone 6 32gb\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Iphone 6 32gb\"","children":[{"start":21,"value":"Iphone 6 32gb","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Selected device detail should show on the PDP Page","stepMatchArguments":[]}]},
  {"pwTestLine":35,"pickleLine":23,"tags":["@sanity","@regression"],"steps":[{"pwStepLine":36,"gherkinStepLine":14,"keywordType":"Context","textWithKeyword":"Given user has storage state authentication and logged in","stepMatchArguments":[]},{"pwStepLine":37,"gherkinStepLine":15,"keywordType":"Action","textWithKeyword":"When user selects category \"Phones\"","stepMatchArguments":[{"group":{"start":22,"value":"\"Phones\"","children":[{"start":23,"value":"Phones","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":38,"gherkinStepLine":16,"keywordType":"Action","textWithKeyword":"And user selects device \"Sony xperia z5\"","stepMatchArguments":[{"group":{"start":20,"value":"\"Sony xperia z5\"","children":[{"start":21,"value":"Sony xperia z5","children":[{"children":[]}]},{"children":[{"children":[]}]}]},"parameterTypeName":"string"}]},{"pwStepLine":39,"gherkinStepLine":17,"keywordType":"Outcome","textWithKeyword":"Then Selected device detail should show on the PDP Page","stepMatchArguments":[]}]},
]; // bdd-data-end