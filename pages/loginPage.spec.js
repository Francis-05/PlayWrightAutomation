const {test, expect} = require('@playwright/test');

class loginPage {
    constructor(page) {
        this.page = page;

        //login feature locators
        
        this.emailInput = page.getByRole('textbox', { name: 'email@example.com' });
        this.passwordInput = page.getByRole('textbox', { name: 'enter your passsword' });
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.toastMessage = page.locator('#toast-container');
        this.invalidFeedbacks = page.locator('.invalid-feedback');
        this.forgotPassword = page.getByRole('link', {name: 'Forgot password'});
        this.registerLink = page.getByText('Don\'t have an account?');
    }

    async login (email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async toastErrorMessage (floatError){
        await expect(this.toastMessage).toHaveText(floatError);
    }

    async clickLogin () {
        await this.loginButton.click();
    }

    async clickForgotPassword () {
        await this.forgotPassword.click();
    }

    async clickRegister () {
        await this.registerLink();
    }
}

module.exports = { loginPage };