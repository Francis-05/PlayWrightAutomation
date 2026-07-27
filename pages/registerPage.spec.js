// const {test, expect} = require('@playwright/test');

// class registerPage {
//     constructor(page) {
//     this.page = page;
//     // const context = await browser.newContext();
//     // const page = await context.newPage();
//     this.registerButton = page.locator('.btn1');
//     this.firstN = page.locator('#firstName');
//     this.lastN = page.locator('#lastName');
//     this.email = page.locator('#userEmail');
//     this.phone = page.locator('#userMobile');
//     this.option = page.locator('.custom-select.ng-untouched.ng-pristine.ng-valid');
//     this.gender = page.locator("input[value='Male']");
//     this.password = page.locator('#userPassword');
//     this.confirmPass = page.locator('#confirmPassword');
//     this.checkBox = page.locator("input[type='checkbox']");
//     this.submitButton = page.locator('#login');
//     this.loginConfirmbutton = page.locator('.btn-primary');
//     this.toastError = page.locator('#toast-container');
//     }

//     async goto() {
//     await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
//     await this.registerButton.click();
//     console.log(await this.page.title());
//     }

//     async fillregForm(data) {
//     await this.firstN.fill(data.firstname);
//     await this.lastN.fill(data.lastname);
//     await this.email.fill(data.nowemail);
//     await this.phone.fill(data.phonenum);
//     await this.option.selectOption(data.listOfoption);
//     await this.gender.check();
//     await this.password.fill(data.pass);
//     await this.confirmPass.fill(data.conpass);
//     await this.checkBox.check();
//     await this.submitButton.click();
//     }


// }

// module.exports = { registerPage };