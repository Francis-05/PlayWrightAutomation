const {test, expect} = require('@playwright/test');
const {loginPage} = require ('../pages/loginPage.js');
const messages = require('../constants/loginMessages.js');
const testData = require ('../data/loginData.js');
const baseUrls = require ('../data/urls.js');

test.describe('Login Feature', () => {

    let loginP;

    test.beforeEach(async ({ page }) => {
        loginP = new loginPage(page);
        await loginP.goto(baseUrls.loginPageURL.url);
    });

    //login feature (happy path cases)
    test.describe('Happy Path TestCases', () => {
        test.only('TC-POS-01: Verify successfull login with valid credentials', async ({page}) => {
            await loginP.login(testData.validUser.email, testData.validUser.password);
            await expect(page).toHaveURL(baseUrls.dashboardURL.url);
        });
    });

    //login feature (negative cases)
    test.describe('Negative TestCases', () => {
        test('TC-NEG-01: Verify error message for login with unregistered email', async ({page}) => {
            await loginP.fillLoginForm(testData.unregisteredUser.email, testData.unregisteredUser.password);
            await loginP.clickLogin();
            await expect(loginP.toastMessage).toHaveText(messages.containerMessages.floatError);
        });

        test('TC-NEG-02: Verify error message for login with incorrect password', async ({page}) => {
            await loginP.fillLoginForm(testData.invalidPasswordUser.email, testData.invalidPasswordUser.password);
            await loginP.clickLogin();
            await expect(loginP.toastMessage).toHaveText(messages.containerMessages.floatError);
        });

        test('TC-NEG-03: Verify error message for login with invalid email format', async ({page}) => {
            await loginP.fillLoginForm(testData.invalidEmailFormat.email, testData.invalidEmailFormat.password);
            await loginP.clickLogin();
            await expect(loginP.emailFieldError).toHaveText(messages.errorMessages.emailInvalid);
        });

        test('TC-NEG-04: Verify error message for empty login fields', async ({page}) => {
            await loginP.clickLogin();
            await expect(loginP.emailFieldError).toHaveText(messages.errorMessages.emailError);
            await expect(loginP.passwordFieldError).toHaveText(messages.errorMessages.passwordError);
        });

        test('TC-NEG-05: Verify error message for empty email with filled password', async ({page}) => {
            await expect(loginP.emailInput).toHaveValue('');
            await loginP.passwordInputValue(testData.validUser.password);
            await loginP.clickLogin();
            await expect(loginP.emailFieldError).toHaveText(messages.errorMessages.emailError);
        });

        test('TC-NEG-06: Verify error message for empty password with filled email', async ({page}) => {
            await loginP.emailInputValue(testData.validUser.email);
            await expect(loginP.passwordInput).toHaveValue('');
            await loginP.clickLogin();
            await expect(loginP.passwordFieldError).toHaveText(messages.errorMessages.passwordError);
        });
    });

    //login feature (UI and Placeholder Validation)
    test.describe('UI and Placeholder Validation', () => {
        test('TC-UI-01: Verify placeholder wording is correct', async ({page}) => {
            await expect(loginP.emailInput).toHaveAttribute('placeholder', messages.loginPlaceholders.email);
            await expect(loginP.passwordInput).toHaveAttribute('placeholder', messages.loginPlaceholders.password);
        });

        test('TC-UI-02: Verify password field is masked when character is inputted', async ({page}) => {
            await expect(loginP.passwordInput).toHaveAttribute('type', 'password');
        });

    });

    //login feature (Navigation and link functionality)
    test.describe('Navigation and Link Functionality', () => {
        test('TC-NAV-01: Verify if redirected successfully when forgot password link is clicked', async ({page}) => {
            await loginP.clickForgotPassword();
            await expect(page).toHaveURL(baseUrls.forgotPasswordURL.url);
        });

        test('TC-NAV-02: Verify if redirected successfully when register here link is clicked', async ({page}) => {
            await loginP.clickRegister();
            await expect(page).toHaveURL(baseUrls.registerURL.url);
        });
    });
});
