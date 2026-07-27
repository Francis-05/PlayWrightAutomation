const {test, expect} = require('@playwright/test');

// const {registerPage} = require('../pages/registerPage.spec.js');

//     test.describe('Registration Feature Tests', ()=> {

//         test('Testcase #1: Verify if registration successful using valid data', async ({page}) => {

//             const regPage = new registerPage(page);
        
//             await regPage.goto();

//             await regPage.fillregForm({
//                 firstname: "francis"
//             })

//         });
//     });



test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
});



//login feature (happy path cases)
test('TC-POS-01: Verify successfull login with valid credentials', async ({page}) => {

    await page.getByRole('textbox', { name: 'email@example.com' }).fill('franz.rose225@gmail.com');
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('admin###123');
    await page.getByRole('button', { name: 'Login' }).click();
    // await expect (page.getByText('*Email is required')).toBeVisible();
    // await expect (page.getByText('*Password is required')).toBeVisible();

    await page.pause();
    console.log("Test Run Success");
});

//login feature (negative cases)
test.only('TC-POS-02: Verify error message for login with unregistered email', async ({page}) => {

    await page.getByRole('textbox', { name: 'email@example.com' }).fill('incorrectuser@g.com');
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('admin###123');
    await page.getByRole('button', { name: 'Login' }).click();
    // await expect(page.getByRole('alert', { name: 'Incorrect email or passssword.' })).toBeVisible();

    const errorMessage = page.locator('#toast-container');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Incorrect email or password.');

    console.log("Test Run Success");
    await page.pause();
});


// test('test', async ({ page }) => {
//   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
//   await page.getByRole('link', { name: 'Register' }).click();
//   await page.getByRole('textbox', { name: 'First Name' }).click();
//   await page.locator('div').filter({ hasText: 'First Name' }).nth(4).click();
//   await page.getByRole('textbox', { name: 'Last Name' }).click();
//   await page.getByRole('textbox', { name: 'email@example.com' }).click();
//   await page.getByRole('textbox', { name: 'enter your number' }).click();
//   await page.getByRole('combobox').selectOption('2: Student');
//   await page.getByRole('combobox').selectOption('3: Engineer');
//   await page.getByRole('combobox').selectOption('4: Scientist');
//   await page.getByRole('combobox').selectOption('1: Doctor');
//   await page.getByRole('radio', { name: 'Male', exact: true }).check();
//   await page.getByRole('radio', { name: 'Female' }).check();
//   await page.getByRole('textbox', { name: 'Passsword' }).click();
//   await page.getByRole('textbox', { name: 'Confirm Password' }).click();
//   await page.getByRole('checkbox').check();
//   await page.getByRole('button', { name: 'Register' }).click();
//   await page.getByText('*First Name is required').click();
//   await page.getByText('*Email is required').click();
//   await page.getByText('*Phone Number is required').click();
//   await page.getByText('*Password is required').click();
//   await page.getByText('Confirm Password is required').click();
// });





// test.only('TC-POS-01: Verify if error for wrong credentials', async ({browser})=>
// {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const registerButton = page.locator('.btn1');
//     const firstN = page.locator('#firstName');
//     const lastN = page.locator('#lastName');
//     const email = page.locator('#userEmail');
//     const phone = page.locator('#userMobile');
//     const option = page.locator('.custom-select.ng-untouched.ng-pristine.ng-valid');
//     const gender = page.locator("input[value='Male']");
//     const password = page.locator('#userPassword');
//     const confirmPass = page.locator('#confirmPassword');
//     const checkBox = page.locator("input[type='checkbox']");
//     const submitButton = page.locator('#login');
//     const loginConfirmbutton = page.locator('.btn-primary');
//     const toastError = page.locator('#toast-container');

//     await firstN.fill("Francis");
//     await lastN.fill("Chris");
//     await email.fill("franz.rose225@gmail.com");
//     await phone.fill("1234567890");
//     await option.selectOption('Student');
//     await gender.check();
//     await password.fill("Test1234");
//     await confirmPass.fill("Test1234");
//     await checkBox.check();
//     await submitButton.click();
//     await expect(toastError).toBeVisible();
//     await expect(toastError).toHaveText("User already exisits with this Email Id!");
    


//     console.log("Test Run Success");
//     //await page.pause();

// });