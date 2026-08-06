// const {test, expect, chromium, locator} = require('@playwright/test');


// test('New user Sign-up in Automation Exercise Website', async ()=>
// {
//     const browser = await chromium.connectOverCDP('http://localhost:9222');
//     const defaultContext = await browser.contexts()[0];
//     const page = await defaultContext.pages()[0];
//     await page.goto('https://automationexercise.com/');
//     await page.locator("a[href='/login']").click();
//     console.log(await page.title());

//     //create new user account

//     await page.locator("input[placeholder='Name']").fill("testFrancis");
//     await page.locator("input[data-qa='signup-email']").fill("franz.rose225@gmail.com");
//     await page.locator("button[data-qa='signup-button']").click();

//     console.log("Account Successfully Created");

//     // input credentials for account information
    
//     const radiolocator = page.locator("id_gender1");
//     const inputLocator = page.locator("#name");
//     const emailLocator = page.locator("#email");

//     await radiolocator.check("#id_gender1");

//     await expect(radiolocator("#id_gender1")).toBeChecked();
//     await expect(inputLocator("#name")).not.toBeEmpty();
//     await expect(emailLocator("#email")).not.toBeEmpty();
    
//     console.log("Test Passed");


   
// });