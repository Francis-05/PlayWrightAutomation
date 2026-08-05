const { basePage } = require('./basePage.js');

class loginPage extends basePage {
    constructor(page) {
        super(page);

        //login feature locators
        this.emailInput = page.getByRole('textbox', { name: 'email@example.com' });
        this.passwordInput = page.getByRole('textbox', { name: 'enter your passsword' });
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.invalidEmail = page.getByText('*Enter Valid Email');
        this.emailError = page.getByText('*Email is required');
        this.passwordError = page.getByText('*Password is required');
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