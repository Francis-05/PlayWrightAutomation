const {test, expect} = require ('@playwright/test');
const {loginPage} = require ('../pages/auth/loginPage.js');
const testData = require ('../data/auth/loginData.js');
const baseUrls = require ('../data/urls.js');
const { log } = require('node:console');

const authFile = 'playwright/.auth/user.json';

test('authenticate', async ({page}) => {
    const loginP = new loginPage(page);

    await loginP.goto(baseUrls.loginPageURL.url);
    await loginP.login(testData.validUser.email, testData.validUser.password);

    await page.waitForURL(baseUrls.dashboardURL.url);

    await page.context().storageState({ path: authFile });
});
