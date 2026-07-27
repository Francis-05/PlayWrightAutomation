const {test, expect} = require('@playwright/test');

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
    
//allert pop up message
    const errorMessage = page.locator('#toast-container');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Incorrect email or password.');

    console.log("Test Run Success");
    await page.pause();
});