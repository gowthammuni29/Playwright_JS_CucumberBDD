import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';
import { HomePage } from '../pages/homePage.js';
import { testData } from '../tests/utils/testData.js';

setup('authenticate', async ({ page }, testInfo) => {
    const browserName = testInfo.project.use.browserName || 'chromium';
    const authFile = `auth.${browserName}.json`;

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);

    await loginPage.gotoLoginPage();
    await homePage.selectHomepageTab('Log in');
    await loginPage.login(testData.validUser.username, testData.validUser.password);
    await loginPage.validateLoginSuccess();

    await page.context().storageState({ path: authFile });
});