const { basePage } = require('./basePage.js');

class registerPage extends basePage {
    constructor (page) {
        super(page);

        //register page locators for fields and buttons
        this.firstname = page.getByRole('textbox', { name: 'First Name' });
        this.lastname = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'email@example.com' });
        this.phoneNumber = page.getByRole('textbox', { name: 'enter your number' });
        this.occupationDrop = page.locator('select[formcontrolname="occupation"]');
        this.genderMale =  page.getByRole('radio', { name: 'Male', exact: true });
        this.genderFemale = page.getByRole('radio', { name: 'Female' });
        this.password = page.getByRole('textbox', { name: 'Passsword' });
        this.confirmPass = page.getByRole('textbox', { name: 'Confirm Password' });
        this.confirmCheckbox = page.getByRole('checkbox');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
        this.fnameFieldError = page.locator('div.form-group', {has: this.firstname}).locator('div.invalid-feedback div');
        this.lnameFieldError = page.locator('div.form-group', {has: this.lastname}).locator('div.invalid-feedback div');
        this.emailFieldError = page.locator('div.form-group', {has: this.email}).locator('div.invalid-feedback div');
        this.phoneNumFieldError = page.locator('div.form-group', {has: this.phoneNumber}).locator('div.invalid-feedback div');
        this.passFieldError = page.locator('div.form-group', {has: this.password}).locator('div.invalid-feedback div');
        this.confirmpassFieldError = page.locator('div.form-group', {has: this.confirmPass}).locator('div.invalid-feedback div');
        this.checkBoxError = page.getByText('*Please check above checkbox');
    }
    
    async registerUser (fname, lname, email, phoneNum, occupation1, password, confirmPass) {
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.email.fill(email);
        await this.phoneNumber.fill(phoneNum);
        await this.occupationDrop.selectOption({label: occupation1});
        await this.genderMale.click();
        await this.password.fill(password);
        await this.confirmPass.fill(confirmPass);
        await this.confirmCheckbox.click();
        await this.registerButton.click();
    }

    async radioGenderMale (fname, lname, email, phoneNum, occupation1, password, confirmPass) {
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.email.fill(email);
        await this.phoneNumber.fill(phoneNum);
        await this.occupationDrop.selectOption({label: occupation1});
        await this.genderMale.click();
        await this.password.fill(password);
        await this.confirmPass.fill(confirmPass);
        await this.confirmCheckbox.click();
        await this.registerButton.click();
    }

    async radioGenderFemale (fname, lname, email, phoneNum, occupation1, password, confirmPass) {
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.email.fill(email);
        await this.phoneNumber.fill(phoneNum);
        await this.occupationDrop.selectOption({label: occupation1});
        await this.genderFemale.click();
        await this.password.fill(password);
        await this.confirmPass.fill(confirmPass);
        await this.confirmCheckbox.click();
        await this.registerButton.click();
    }

    async fillMandatoryFields (fname, lname, email, phoneNum, occupation1, password, confirmPass) {
        await this.firstname.fill(fname);
        await this.lastname.fill(lname);
        await this.email.fill(email);
        await this.phoneNumber.fill(phoneNum);
        await this.occupationDrop.selectOption({label: occupation1});
        await this.genderMale.click();
    }

    async clickCheckbox () {
        await this.confirmCheckbox.click();
    }

    async passwordMismatch (password, confirmpass){
        await this.password.fill(password);
        await this.confirmPass.fill(confirmpass);
    }

    async clickRegisterBtn () {
        await this.registerButton.click();
    }

    async clickLoginBtn() {
        await this.loginBtn.click();
    }

}

module.exports = { registerPage };