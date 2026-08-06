// const {test, expect} = require('@playwright/test');


// test('Browser Context Playwright test', async ({browser})=>
// {
//     //chrome - plugins/cookies
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     const loginEmail = page.locator("input[data-qa='login-email']");
//     const loginPassword = page.locator("input[data-qa='login-password']");
//     const loginButton = page.locator("button[data-qa='login-button']");
//     const productInfo = page.locator(".features_items .col-sm-4 .product-image-wrapper .single-products .productinfo p");

//     await page.goto('https://automationexercise.com/');
//     await page.locator("a[href='/login']").click();
//     console.log(await page.title());


//     //css, xpath

//     await loginEmail.fill("test@example.com");
//     await loginPassword.fill("test123");
//     await loginButton.click();
//     console.log(await page.locator("[style='color: red;']").textContent());
//     await expect(page.locator("[style='color: red;']")).toContainText("Your email or password is incorrect!");

//     //type or fill inputing data into input fields

//     await loginEmail.fill("");
//     await loginEmail.fill("franz.rose225@gmail.com");
//     await loginPassword.fill("");
//     await loginPassword.fill("admin123");
//     await loginButton.click();

//     //selecting items in the product card and clicking on add to cart button
    
//     // console.log(await productInfo.first().textContent());
//     // console.log(await productInfo.nth(1).textContent());
//     // console.log(await productInfo.nth(2).textContent());
//     const allproductInfo = await productInfo.allTextContents();
//     console.log(allproductInfo);



//     console.log("Test Run Successfully");







// });









// test('New user Sign-up in Automation Exercise Website', async ({browser})=>
// {
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('https://automationexercise.com/');
//     await page.locator("a[href='/login']").click();
//     console.log(await page.title());

//     await page.locator("input[placeholder='Name']").fill("testFrancis");
//     await page.locator("input[data-qa='signup-email']").fill("franz.rose225@gmail.com");
//     await page.locator("button[data-qa='signup-button']").click();

//     console.log("Account Successfully Created");


    


// });

// test('Page Playwright Test', async ({page})=>
// {
//     await page.goto('https://google.com');
//     console.log(await page.title());
//     await expect (page).toHaveTitle("Google");


// });
