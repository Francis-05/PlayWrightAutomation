const {test, expect} = require('@playwright/test');
const { exec } = require('node:child_process');

test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
});

//login feature (happy path cases)
test('TC-POS-01: Verify successfull login with valid credentials', async ({page}) => {

    await page.getByRole('textbox', { name: 'email@example.com' }).fill('franz.rose225@gmail.com');
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('admin###123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

});

//login feature (negative cases)
test('TC-POS-02: Verify error message for login with unregistered email', async ({page}) => {

    await page.getByRole('textbox', { name: 'email@example.com' }).fill('incorrectuser@g.com');
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('admin###123');
    await page.getByRole('button', { name: 'Login' }).click();
    
//allert pop up message
    const errorMessage = page.locator('#toast-container');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Incorrect email or password.');

});

test('TC-POS-03: Verify error message for login with incorrect password', async ({page}) => {

    await page.getByRole('textbox', { name: 'email@example.com' }).fill('franz.rose225@gmail.com');
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('incorrectpass');
    await page.getByRole('button', { name: 'Login' }).click();
    
//allert pop up message
    const errorMessage = page.locator('#toast-container');
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText('Incorrect email or password.');

});

test('TC-POS-04: Verify error message for login with invalid email format', async ({page}) => {

    await page.getByRole('textbox', { name: 'email@example.com' }).fill('franz.rose225@@@gmail.com');
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('admin###123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.invalid-feedback').first()).toHaveText('*Enter Valid Email');

});

test('TC-POS-05: Verify error message for empty login fields', async ({page}) => {

    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.invalid-feedback').nth(0)).toHaveText('*Email is required');
    await expect(page.locator('.invalid-feedback').nth(1)).toHaveText('*Password is required');

});

test('TC-POS-06: Verify error message for empty email with filled password', async ({page}) => {

    await page.getByRole('textbox', { name: 'email@example.com' }).fill('');
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('admin###123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.invalid-feedback')).toHaveText('*Email is required');

});

test('TC-POS-07: Verify error message for empty password with filled email', async ({page}) => {

    await page.getByRole('textbox', { name: 'email@example.com' }).fill('franz.rose225@gmail.com');
    await page.getByRole('textbox', { name: 'enter your passsword' }).fill('');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.invalid-feedback')).toHaveText('*Password is required');

});

//login feature (UI and Placeholder Validation)
test('TC-POS-08: Verify placeholder wording is correct', async ({page}) => {

    await expect(page.locator('.form-control').nth(0)).toHaveAttribute('placeholder','email@example.com');
    await expect(page.locator('.form-control').nth(1)).toHaveAttribute('placeholder', 'enter your passsword');

});

test('TC-POS-09: Verify password field is masked when character is inputted', async ({page}) => {

    await expect(page.locator('[type="password"]')).toHaveAttribute('type', 'password');

});

//login feature (Navigation and link functionality)
test('TC-POS-10: Verify if redirected successfully when forgot password link is clicked', async ({page}) => {

    await page.getByRole('link', { name: 'Forgot password?' }).click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/password-new');

});

test('TC-POS-11: Verify if redirected successfully when register here link is clicked', async ({page}) => {

    await page.getByText('Don\'t have an account?').click();
    await expect(page).toHaveURL('https://rahulshettyacademy.com/client/#/auth/register');

});