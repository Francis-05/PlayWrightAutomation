const {test, expect} = require ('@playwright/test');
const {registerPage} = require ('../pages/registerPage.js');
const testData = require ('../data/registerData.js');
const messages = require ('../constants/registerMessages.js');
const baseUrls = require ('../data/urls.js');


test.describe('Register Feature', () => {
    let registerP;

    test.beforeEach(async ({page}) => {
        registerP = new registerPage(page);
        await registerP.goto(baseUrls.registerURL.url);
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
                testData.regGender.male, 
                testData.regfieldCredentials.password, 
                testData.regfieldCredentials.confirmPass);
            await expect(registerP.toastMessage).toHaveText(messages.containerMessages.floatSuccess);
            await registerP.clickLoginBtn();
            await expect(page).toHaveURL(baseUrls.loginPageURL.url);
        });

        const radioGender = Object.values(testData.regGender);
        radioGender.forEach((gender, index) => {
            test(`TC-POS-0${index + 2}: Verify if user register successfully with "${gender}" gender selectedgender registration`, async ({page}) => {
                await registerP.registerUser(
                    testData.regfieldCredentials.fname, 
                    testData.regfieldCredentials.lname, 
                    testData.generateUniqueEmail(), 
                    testData.regfieldCredentials.phoneNum, 
                    testData.regdropdownOccupation.student,
                    gender,
                    testData.regfieldCredentials.password, 
                    testData.regfieldCredentials.confirmPass);
                await expect(registerP.toastMessage).toHaveText(messages.containerMessages.floatSuccess);
             });
        });

        const occupations = Object.values(testData.regdropdownOccupation);
        occupations.forEach((occupation, index) => {
            test(`TC-POS-04 (${index + 1}): Verify if successful registration - occupation ${occupation}`, async ({page}) => {
                await registerP.registerUser(
                    testData.regfieldCredentials.fname, 
                    testData.regfieldCredentials.lname, 
                    testData.generateUniqueEmail(), 
                    testData.regfieldCredentials.phoneNum, 
                    occupation, 
                    testData.regGender.male,
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

        test('TC-NEG-02: Verify validation error for empty Firstname', async ({page}) => {
            await registerP.fillMandatoryFields({
                lastname: testData.regfieldCredentials.lname,
                email: testData.generateUniqueEmail(),
                phoneNumber: testData.regfieldCredentials.phoneNum,
                occupation: testData.regdropdownOccupation.doctor,
                gender: testData.regGender.male,
                password: testData.regfieldCredentials.password,
                confirmPass: testData.regfieldCredentials.confirmPass});
            await registerP.clickCheckbox();
            await registerP.clickRegisterBtn();
            await expect(registerP.fnameFieldError).toHaveText(messages.errorMessages.requiredFname);
        });
        // TODO: Bug - missing error message empty last name (to fix by dev)
        // test('TC-NEG-03: Verify validation error for empty Lastname', async ({page}) => {
        //     await registerP.fillMandatoryFields({
        //         firstname: testData.regfieldCredentials.fname,
        //         email: testData.generateUniqueEmail(),
        //         phoneNumber: testData.regfieldCredentials.phoneNum,
        //         occupation: testData.regdropdownOccupation.doctor,
        //         gender: testData.regGender.male,
        //         password: testData.regfieldCredentials.password,
        //         confirmPass: testData.regfieldCredentials.confirmPass});
        //     await registerP.clickCheckbox();
        //     await registerP.clickRegisterBtn();
        //     await expect(registerP.lnameFieldError).toHaveText(messages.errorMessages.requiredLname);
        // });

        test('TC-NEG-04: Verify validation error for empty Email', async ({page}) => {
            await registerP.fillMandatoryFields({
                firstname: testData.regfieldCredentials.fname,
                lastname: testData.regfieldCredentials.lname,
                phoneNumber: testData.regfieldCredentials.phoneNum,
                occupation: testData.regdropdownOccupation.doctor,
                gender: testData.regGender.male,
                password: testData.regfieldCredentials.password,
                confirmPass: testData.regfieldCredentials.confirmPass});
            await registerP.clickCheckbox();
            await registerP.clickRegisterBtn();
            await expect(registerP.emailFieldError).toHaveText(messages.errorMessages.requiredemail);
        });

        test('TC-NEG-05: Verify validation error for empty Phone Number', async ({page}) => {
            await registerP.fillMandatoryFields({
                firstname: testData.regfieldCredentials.fname,
                lastname: testData.regfieldCredentials.lname,
                email: testData.generateUniqueEmail(),
                occupation: testData.regdropdownOccupation.doctor,
                gender: testData.regGender.male,
                password: testData.regfieldCredentials.password,
                confirmPass: testData.regfieldCredentials.confirmPass});
            await registerP.clickCheckbox();
            await registerP.clickRegisterBtn();
            await expect(registerP.phoneNumFieldError).toHaveText(messages.errorMessages.requiredphoneNum);
        });

        test('TC-NEG-06: Verify validation error for empty Password with mistmatch error', async ({page}) => {
            await registerP.fillMandatoryFields({
                firstname: testData.regfieldCredentials.fname,
                lastname: testData.regfieldCredentials.lname,
                email: testData.generateUniqueEmail(),
                phoneNumber: testData.regfieldCredentials.phoneNum,
                occupation: testData.regdropdownOccupation.doctor,
                gender: testData.regGender.male,
                confirmPass: testData.regfieldCredentials.confirmPass});
            await registerP.clickCheckbox();
            await registerP.clickRegisterBtn();
            await expect(registerP.passFieldError).toHaveText(messages.errorMessages.requiredPass);
            await expect(registerP.confirmpassFieldError).toHaveText(messages.errorMessages.mistmatchPass);
        });

        test('TC-NEG-07: Verify validation error for empty Confirm Password', async ({page}) => {
            await registerP.fillMandatoryFields({
                firstname: testData.regfieldCredentials.fname,
                lastname: testData.regfieldCredentials.lname,
                email: testData.generateUniqueEmail(),
                phoneNumber: testData.regfieldCredentials.phoneNum,
                occupation: testData.regdropdownOccupation.doctor,
                gender: testData.regGender.male,
                password: testData.regfieldCredentials.password,});
            await registerP.clickCheckbox();
            await registerP.clickRegisterBtn();
            await expect(registerP.confirmpassFieldError).toHaveText(messages.errorMessages.requiredConfirmpass);
        });
        
        test('TC-NEG-08: Verify validation error for mismatch Password & Confirm Password', async ({page}) => {
            await registerP.fillMandatoryFields({
                firstname: testData.regfieldCredentials.fname,
                lastname: testData.regfieldCredentials.lname,
                email: testData.generateUniqueEmail(),
                phoneNumber: testData.regfieldCredentials.phoneNum,
                occupation: testData.regdropdownOccupation.doctor,
                gender: testData.regGender.male,
                password: testData.passwordMismatch.password,
                confirmPass: testData.passwordMismatch.confirmPass});
            await registerP.clickCheckbox();
            await registerP.clickRegisterBtn();
            await expect(registerP.confirmpassFieldError).toHaveText(messages.errorMessages.mistmatchPass);
        });
       
        test('TC-NEG-09: Verify validation error for unchecked age checkbox', async ({page}) => {
                await registerP.fillMandatoryFields({
                    firstname: testData.regfieldCredentials.fname,
                    lastname: testData.regfieldCredentials.lname,
                    email: testData.generateUniqueEmail(),
                    phoneNumber: testData.regfieldCredentials.phoneNum,
                    occupation: testData.regdropdownOccupation.doctor,
                    gender: testData.regGender.male,
                    password: testData.regfieldCredentials.password,
                    confirmPass: testData.regfieldCredentials.confirmPass});
                await registerP.clickRegisterBtn();
                await expect(registerP.checkBoxError).toHaveText(messages.errorMessages.checkboxError);
        });

        test('TC-NEG-10: Verify error message for invalid email format', async ({page}) => {
                await registerP.fillMandatoryFields({
                    firstname: testData.regfieldCredentials.fname,
                    lastname: testData.regfieldCredentials.lname,
                    email: testData.invalidUsers.email,
                    phoneNumber: testData.regfieldCredentials.phoneNum,
                    occupation: testData.regdropdownOccupation.doctor,
                    gender: testData.regGender.male,
                    password: testData.regfieldCredentials.password,
                    confirmPass: testData.regfieldCredentials.confirmPass});
                await registerP.clickCheckbox();
                await registerP.clickRegisterBtn();
                await expect(registerP.emailFieldError).toHaveText(messages.validMessages.validEmail);
        });

        test('TC-NEG-11: Verify if error message appears for duplicate user registration', async ({page}) => {
                await registerP.fillMandatoryFields({
                    firstname: testData.alreadyRegisteredUser.fname,
                    lastname: testData.alreadyRegisteredUser.lname,
                    email: testData.alreadyRegisteredUser.email,
                    phoneNumber: testData.alreadyRegisteredUser.phoneNum,
                    occupation: testData.regdropdownOccupation.doctor,
                    gender: testData.regGender.male,
                    password: testData.alreadyRegisteredUser.password,
                    confirmPass: testData.alreadyRegisteredUser.confirmPass});
                await registerP.clickCheckbox();
                await registerP.clickRegisterBtn();
                await expect(registerP.toastMessage).toHaveText(messages.containerMessages.floatErrorEmailDuplicate);
        });

        test('TC-NEG-12: Verify error validation for letters/symbols in phone number field', async ({page}) => {
                await registerP.fillMandatoryFields({
                    firstname: testData.regfieldCredentials.fname,
                    lastname: testData.regfieldCredentials.lname,
                    email: testData.generateUniqueEmail(),
                    phoneNumber: testData.invalidUsers.validphoneNum,
                    occupation: testData.regfieldCredentials.doctor,
                    gender: testData.regGender.male,
                    password: testData.regfieldCredentials.password,
                    confirmPass: testData.regfieldCredentials.confirmPass});
                await registerP.clickCheckbox();
                await registerP.clickRegisterBtn();
                await expect(registerP.phoneNumFieldError).toHaveText(messages.validMessages.validphoneNum);
        });

        test('TC-NEG-13: Verify error validation for short/long digits in phone number field', async ({page}) => {
                await registerP.fillMandatoryFields({
                    firstname: testData.regfieldCredentials.fname,
                    lastname: testData.regfieldCredentials.lname,
                    email: testData.generateUniqueEmail(),
                    phoneNumber: testData.invalidUsers.lengthphoneNum,
                    occupation: testData.regfieldCredentials.doctor,
                    gender: testData.regGender.male,
                    password: testData.regfieldCredentials.password,
                    confirmPass: testData.regfieldCredentials.confirmPass});
                await registerP.clickCheckbox();
                await registerP.clickRegisterBtn();
                await expect(registerP.phoneNumFieldError).toHaveText(messages.inputValMessages.lengthphoneNum);
        });

        test('TC-NEG-14: Verify error validation for password that doesnt meet complexity', async ({page}) => {
                await registerP.fillMandatoryFields({
                    firstname: testData.regfieldCredentials.fname,
                    lastname: testData.regfieldCredentials.lname,
                    email: testData.generateUniqueEmail(),
                    phoneNumber: testData.regfieldCredentials.phoneNum,
                    occupation: testData.regfieldCredentials.doctor,
                    gender: testData.regGender.male,
                    password: testData.shortPassword.password,
                    confirmPass: testData.shortPassword.confirmPass});
                await registerP.clickCheckbox();
                await registerP.clickRegisterBtn();
                await expect(registerP.toastMessage).toHaveText(messages.containerMessages.floatErrorPassword);
        });
    });

    //register feature (UI / Placeholder Validation)
    test.describe('UI / Placeholder Validation', () => {
        test('TC-UI-01: Verify if placeholder text is correct for all fields', async ({page}) => {
            await expect(registerP.firstname).toHaveAttribute('placeholder', testData.registerFieldPlaceholders.fname);
            await expect(registerP.lastname).toHaveAttribute('placeholder', testData.registerFieldPlaceholders.lname);
            await expect(registerP.email).toHaveAttribute('placeholder', testData.registerFieldPlaceholders.email);
            await expect(registerP.phoneNumber).toHaveAttribute('placeholder', testData.registerFieldPlaceholders.phoneNum);
            await expect(registerP.password).toHaveAttribute('placeholder', testData.registerFieldPlaceholders.password);
            await expect(registerP.confirmPass).toHaveAttribute('placeholder', testData.registerFieldPlaceholders.confirmPass);
        });

        test('TC-UI-02: Verify if "Choose your occupation" set as default display in dropdown', async ({page}) => {
            await expect(registerP.dropdownDefault).toHaveText(testData.registerFieldPlaceholders.dropdown);
        });

        test('TC-UI-03: Verify if all mandatory fields are empty by default on page load', async ({page}) => {
            const emptyFields = [registerP.firstname, registerP.lastname, registerP.email, registerP.phoneNumber, registerP.occupationDrop, registerP.password, registerP.confirmPass];
            for(const empty of emptyFields) {
                await expect(empty).toHaveValue(testData.emptyRegisterFields.defaultEmpty);
            }
        });

        test('TC-UI-04: Verify if gender radio buttons are default unselected', async ({page}) => {
            const genderRadio = [registerP.genderMale, registerP.genderFemale];
            for(const radio of genderRadio) {
                await expect(radio).not.toBeChecked();
            }
        });

        test('TC-UI-05: Verify if checkbox for age is default unchecked', async ({page}) => {
            await expect(registerP.confirmCheckbox).not.toBeChecked();
        });

        test('TC-UI-06: Verify password and confirm password field is masked when character is inputted', async ({page}) => {
            const maskPassword = [registerP.password, registerP.confirmPass];
            for(const masked of maskPassword) {
                await expect(masked).toHaveAttribute('type', 'password');
            }
        });
    });

    //register feature (UI / Placeholder Validation)
    test.describe('Navigation and Link Functionality', () => {
        test('TC-NAV-01: Verify clicking "Already have an account? Login here" redirects to login page', async ({page}) => {
            await registerP.clickLoginHereBtn();
            await expect(page).toHaveURL(baseUrls.loginPageURL.url);
        });
    });
});