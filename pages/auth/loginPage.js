const { basePage } = require('../basePage.js');

class loginPage extends basePage {
    constructor(page) {
        super(page);

        //login feature locators
        this.emailInput = page.getByRole('textbox', { name: 'email@example.com' });
        this.passwordInput = page.getByRole('textbox', { name: 'enter your passsword' });

        this.loginButton = page.getByRole('button', {name: 'Login'});

        this.emailFieldError = page.locator('div.form-group', {has: this.emailInput}).locator('div.invalid-feedback div');
        this.passwordFieldError = page.locator('div.form-group', {has: this.passwordInput}).locator('div.invalid-feedback div');
        
        this.forgotPassword = page.getByRole('link', {name: 'Forgot password'});
        this.registerLink = page.getByText('Don\'t have an account?');

    }

    async login (email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async fillLoginForm (email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
    }

    async emailInputValue (email) {
        await this.emailInput.fill(email);
    }

    async passwordInputValue (password) {
        await this.passwordInput.fill(password);
    }

    async clickLogin () {
        await this.loginButton.click();
    }

    async clickForgotPassword () {
        await this.forgotPassword.click();
    }

    async clickRegister () {
        await this.registerLink.click();
    }

}

module.exports = { loginPage };