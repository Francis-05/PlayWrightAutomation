class registerPage {
    constructor (page) {
        this.page = page;

        //register page locators
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
    }
    
    async registerUser (fname, lname, email, phoneNum, password, confirmPass, occupation1) {
        await this.firstname.fill(fname);;
        await this.lastname.fill(lname);
        await this.email.fill(email);;
        await this.phoneNumber.fill(phoneNum);
        await this.occupationDrop.selectOption({label: occupation1});
        await this.genderMale.click();
        await this.password.fill(password);
        await this.confirmPass.fill(confirmPass);
        await this.confirmCheckbox.click();
    }

}

module.exports = { registerPage };