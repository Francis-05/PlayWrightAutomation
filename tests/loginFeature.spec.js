const {test, expect} = require('@playwright/test');
const {loginPage} = require ('../pages/loginPage.js');
const messages = require('../constants/loginMessages.js');
const testData = require ('../data/loginData.js');
const baseUrls = require ('../data/urls.js');

let loginP;

test.beforeEach(async ({ page }) => {
    loginP = new loginPage(page);
    await page.goto(baseUrls.loginPageURL.url);
});

//login feature (happy path cases)
test('TC-POS-01: Verify successfull login with valid credentials', async ({page}) => {

    await loginP.login(testData.validUser.email, testData.validUser.password);
    await expect(page).toHaveURL(baseUrls.dashboardURL.url);

});

//login feature (negative cases)
test('TC-NEG-02: Verify error message for login with unregistered email', async ({page}) => {

    await loginP.fillLoginForm(testData.unregisteredUser.email, testData.unregisteredUser.password);
    await loginP.clickLogin();
    await expect(loginP.toastMessage).toHaveText(messages.containerMessages.floatError);

});

test('TC-NEG-03: Verify error message for login with incorrect password', async ({page}) => {

    await loginP.fillLoginForm(testData.invalidPasswordUser.email, testData.invalidPasswordUser.password);
    await loginP.clickLogin();
    await expect(loginP.toastMessage).toHaveText(messages.containerMessages.floatError);

});

test('TC-POS-04: Verify error message for login with invalid email format', async ({page}) => {

    await loginP.fillLoginForm(testData.invalidEmailFormat.email, testData.invalidEmailFormat.password);
    await loginP.clickLogin();
    await expect(loginP.invalidEmail).toHaveText(messages.errorMesages.emailInvalid);

});

test('TC-POS-05: Verify error message for empty login fields', async ({page}) => {

    await loginP.clickLogin();
    await expect(loginP.emailError).toHaveText(messages.errorMesages.emailError);
    await expect(loginP.passwordError).toHaveText(messages.errorMesages.passwordError);

});

test('TC-POS-06: Verify error message for empty email with filled password', async ({page}) => {

    await expect(loginP.emailInput).toHaveValue('');
    await loginP.passwordInputValue(testData.validUser.password);
    await loginP.clickLogin();
    await expect(loginP.emailError).toHaveText(messages.errorMesages.emailError);

});

test('TC-POS-07: Verify error message for empty password with filled email', async ({page}) => {

    await loginP.emailInputValue(testData.validUser.email);
    await expect(loginP.passwordInput).toHaveValue('');
    await loginP.clickLogin();
    await expect(loginP.passwordError).toHaveText(messages.errorMesages.passwordError);

});

//login feature (UI and Placeholder Validation)
test('TC-POS-08: Verify placeholder wording is correct', async ({page}) => {

    await expect(loginP.emailInput).toHaveAttribute('placeholder', testData.loginPlaceholders.email);
    await expect(loginP.passwordInput).toHaveAttribute('placeholder', testData.loginPlaceholders.password);

});

test('TC-POS-09: Verify password field is masked when character is inputted', async ({page}) => {

    await expect(loginP.passwordInput).toHaveAttribute('type', 'password');

});

//login feature (Navigation and link functionality)
test('TC-POS-10: Verify if redirected successfully when forgot password link is clicked', async ({page}) => {

    await loginP.clickForgotPassword();
    await expect(page).toHaveURL(baseUrls.forgotPasswordURL.url);

});

test('TC-POS-11: Verify if redirected successfully when register here link is clicked', async ({page}) => {

    await loginP.clickRegister();
    await expect(page).toHaveURL(baseUrls.registerURL.url);
});