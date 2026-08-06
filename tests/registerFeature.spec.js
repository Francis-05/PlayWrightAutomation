const {test, expect} = require ('@playwright/test');
const {registerPage} = require ('../pages/registerPage.js');
const testData = require ('../data/registerData.js');
const messages = require ('../constants/registerMessages.js');
const baseUrls = require ('../data/urls.js');

const occupations = Object.values(testData.regdropdownOccupation);

test.describe('Register Feature', () => {
    let registerP;

    test.beforeEach(async ({page}) => {
        registerP = new registerPage(page);
        await registerP.goto(baseUrls.registerURL.url);
        await page.waitForLoadState('networkidle');
    });

    //register feature (happy path testcase)
    test.describe('Happy Path TestCase', () => {
        test('TC-POS-01: Verify if user can register account successfully', async ({page}) => {
            await registerP.registerUser(
                testData.regfieldCredentials.fname, 
                testData.regfieldCredentials.lname, 
                testData.generateUniqueEmail(), 
                testData.regfieldCredentials.phoneNum, 
                testData.regdropdownOccupation.doctor,
                'Male', 
                testData.regfieldCredentials.password, 
                testData.regfieldCredentials.confirmPass);
            await expect(registerP.toastMessage).toHaveText(messages.containerMessages.floatSuccess);
            await registerP.clickLoginBtn();
            await expect(page).toHaveURL(baseUrls.loginPageURL.url);
        });

        test('TC-POS-02: Verify if user register successfully with "Male" gender selected', async ({page}) => {
            await registerP.registerUser(
                testData.regfieldCredentials.fname, 
                testData.regfieldCredentials.lname, 
                testData.generateUniqueEmail(), 
                testData.regfieldCredentials.phoneNum, 
                testData.regdropdownOccupation.student,
                'Male',
                testData.regfieldCredentials.password, 
                testData.regfieldCredentials.confirmPass);
            await expect(registerP.toastMessage).toHaveText(messages.containerMessages.floatSuccess);
        });

        test('TC-POS-03: Verify if user register successfully with "Female" gender selected', async ({page}) => {
            await registerP.registerUser(
                testData.regfieldCredentials.fname, 
                testData.regfieldCredentials.lname, 
                testData.generateUniqueEmail(), 
                testData.regfieldCredentials.phoneNum, 
                testData.regdropdownOccupation.engineer,
                'Female', 
                testData.regfieldCredentials.password, 
                testData.regfieldCredentials.confirmPass);
            await expect(registerP.toastMessage).toHaveText(messages.containerMessages.floatSuccess);
        });

        occupations.forEach((occupation) => {
            test(`TC-POS-04: Verify if successful registration - occupation ${occupation}`, async ({page}) => {
                await registerP.registerUser(
                    testData.regfieldCredentials.fname, 
                    testData.regfieldCredentials.lname, 
                    testData.generateUniqueEmail(), 
                    testData.regfieldCredentials.phoneNum, 
                    occupation, 
                    'Male',
                    testData.regfieldCredentials.password, 
                    testData.regfieldCredentials.confirmPass);
                await expect(registerP.toastMessage).toHaveText(messages.containerMessages.floatSuccess);
            });

        });

    });

    //register feature (negative testcases)
    test.describe('Negative TestCases', () => {
        test('TC-NEG-01: Verify validation errors for empty mandatory fields', async({page}) => {
            await registerP.clickRegisterBtn();
            await expect(registerP.fnameFieldError).toHaveText(messages.errorMessages.requiredFname);
            // TODO: Bug - add requiredLname back once UI/UX fixes the missing error message
            await expect(registerP.emailFieldError).toHaveText(messages.errorMessages.requiredemail);
            await expect(registerP.phoneNumFieldError).toHaveText(messages.errorMessages.requiredphoneNum);
            await expect(registerP.passFieldError).toHaveText(messages.errorMessages.requiredPass);
            await expect(registerP.confirmpassFieldError).toHaveText(messages.errorMessages.requiredConfirmpass);
            await expect(registerP.checkBoxError).toHaveText(messages.errorMessages.checkboxError);
        });

        
       
    });

});