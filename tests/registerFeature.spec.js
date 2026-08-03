const {test, expect} = require ('@playwright/test');
const {registerPage} = require ('../pages/registerPage.js');
const testData = require ('../data/registerData.js');
const baseUrls = require ('../data/urls.js');
const registerData = require('../data/registerData.js');

let registerP;

test.beforeEach(async ({page}) => {
    registerP = new registerPage(page);
    await page.goto(baseUrls.registerURL.url);
});

//register feature (happy path cases)
test.only('TC-POS-01: Verify if user can register account successfully', async ({page}) => {
    await registerP.registerUser(testData.regfieldCredentials.fname, testData.regfieldCredentials.lname, testData.regfieldCredentials.email, testData.regfieldCredentials.phoneNum, testData.regfieldCredentials.password, testData.regfieldCredentials.confirmPass);

    console.log('Success');
});