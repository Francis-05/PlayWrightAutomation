const {test, expect} = require ('@playwright/test');
const {registerPage} = require ('../pages/registerPage.js');
const testData = require ('../data/registerData.js');
const baseUrls = require ('../data/urls.js');

let registerP;

test.beforeEach(async ({page}) => {
    registerP = new registerPage(page);
    await page.goto(baseUrls.registerURL.url);
});

//register feature (happy path cases)
test('TC-POS-01: Verify if user can register account successfully', async ({page}) => {
    await registerP.registerUser(testData.regfieldCredentials.fname, testData.regfieldCredentials.lname, testData.regfieldCredentials.email, testData.regfieldCredentials.phoneNum, testData.regdropdownOccupation.occupation1, testData.regfieldCredentials.password, testData.regfieldCredentials.confirmPass);
    await expect(registerP.successContainer).toContainText('Registered Successfully');
    await registerP.clickLoginBtn();
    await expect(page).toHaveURL(baseUrls.loginPageURL.url);
});