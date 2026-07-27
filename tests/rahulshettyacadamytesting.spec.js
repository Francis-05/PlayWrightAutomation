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


test.only('TC-POS-01: Successfull Registration with Valid Data', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const registerButton = page.locator('.btn1');
    const firstN = page.locator('#firstName');
    const lastN = page.locator('#lastName');
    const email = page.locator('#userEmail');
    const phone = page.locator('#userMobile');
    const option = page.locator('.custom-select.ng-untouched.ng-pristine.ng-valid');
    const gender = page.locator("input[value='Male']");
    const password = page.locator('#userPassword');
    const confirmPass = page.locator('#confirmPassword');
    const checkBox = page.locator("input[type='checkbox']");
    const submitButton = page.locator('#login');
    const loginConfirmbutton = page.locator('.btn-primary');
    const toastError = page.locator('#toast-container');

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await registerButton.click();
    console.log(await page.title());

    await firstN.fill("Francis");
    await lastN.fill("Chris");
    await email.fill("franz.rose225@gmail.com");
    await phone.fill("1234567890");
    await option.selectOption('Student');
    await gender.check();
    await password.fill("Test1234");
    await confirmPass.fill("Test1234");
    await checkBox.check();
    await submitButton.click();
    await expect(toastError).toBeVisible();
    await expect(toastError).toHaveText("User already exisits with this Email Id!");
    


    console.log("Test Run Success");
    //await page.pause();

});