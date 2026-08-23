const base = require ('@playwright/test')
const { loginPage } = require ('../pages/auth/loginPage.js');
const { registerPage} = require ('../pages/auth/registerPage.js');
const { filtersPage } = require ('../pages/filters/filtersPage.js');
const { dashboardPage } = require ('../pages/dashboard/dashboardPage.js');

exports.test = base.test.extend({
    loginP: async ({ page }, use) => {
        const loginP = new loginPage(page);
        await use(loginP);
    },

    registerP: async ({ page }, use) => {
        const registerP = new registerPage(page);
        await use(registerP);
    },

    filterP: async ({ page }, use) => {
        const filterP = new filtersPage(page);
        await use(filterP);
    },

    dashboardP: async ({ page }, use) => {
        const dashboardP = new dashboardPage(page);
        await use(dashboardP);
    },

});

exports.expect = base.expect;
