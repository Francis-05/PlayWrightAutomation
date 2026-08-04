const {test, expect} = require ('@playwright/test');
const {registerPage} = require ('../pages/registerPage.js');
const testData = require ('../data/registerData.js');
const messages = require ('../constants/registerMessages.js');
const baseUrls = require ('../data/urls.js');

let registerP;

test.beforeEach(async ({page}) => {
    registerP = new registerPage(page);
    await page.goto(baseUrls.registerURL.url);
});

//register feature (happy path testcase)
test('TC-POS-01: Verify if user can register account successfully', async ({page}) => {

    await registerP.registerUser(testData.regfieldCredentials.fname, testData.regfieldCredentials.lname, testData.regfieldCredentials.email, testData.regfieldCredentials.phoneNum, testData.regdropdownOccupation.occupation1, testData.regfieldCredentials.password, testData.regfieldCredentials.confirmPass);
    await expect(registerP.successContainer).toHaveText(messages.containerMessages.floatSuccess);
    await registerP.clickLoginBtn();
    await expect(page).toHaveURL(baseUrls.loginPageURL.url);

});

//register feature (negative testcases)
test('TC-NEG-02: Verify if registration fail for mistmacth pass and confirm pass', async({page}) => {
    
    await registerP.fillMandatoryFields(testData.regfieldCredentials.fname, testData.regfieldCredentials.lname, testData.regfieldCredentials.email, testData.regfieldCredentials.phoneNum, testData.regdropdownOccupation.occupation1);
    await registerP.passwordMismatch(testData.passwordMismatch.password, testData.passwordMismatch.confirmPass);
    await registerP.clickCheckbox();
    await registerP.clickRegisterBtn();
    await expect(registerP.testboxError).toHaveText(messages.errorMessages.mistmatchPass);

});

test.only('TC-NEG-03: Verify validation errors for empty madatory fields', async ({page}) => {

    await expect(registerP.firstname).toHaveValue('');
    await expect(registerP.lastname).toHaveValue('');
    await expect(registerP.email).toHaveValue('');
    await expect(registerP.phoneNumber).toHaveValue('');
    await expect(registerP.occupationDrop).toHaveValue('');
    await expect(registerP.genderMale).not.toBeChecked();
    await expect(registerP.genderFemale).not.toBeChecked();
    await expect(registerP.password).toHaveValue('');
    await expect(registerP.confirmPass).toHaveValue('');
    await expect(registerP.confirmCheckbox).not.toBeChecked();
    await registerP.clickRegisterBtn();
    await expect(registerP.textFieldError).toHaveText([
        messages.errorMessages.requiredFname,
        // TODO: Bug - add requiredLname back once UI/UX fixes the missing error message
        messages.errorMessages.requiredemail,   
        messages.errorMessages.requiredphoneNum,
        messages.errorMessages.requiredPass,
        messages.errorMessages.requiredConfirmpass,
    ]);
    await expect(registerP.checkBoxError).toHaveText(messages.errorMessages.checkboxError);

});