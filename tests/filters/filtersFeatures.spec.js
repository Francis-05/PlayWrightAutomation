const { test, expect } = require ('@playwright/test');
const { filtersPage } = require ('../../pages/filters/filtersPage.js');
const baseUrls = require ('../../data/urls.js');


test.describe('Filters Feature', () => {

    let filterP;

    test.beforeEach(async ({ page }) => {
        filterP = new filtersPage(page);
        await filterP.goto(baseUrls.dashboardURL.url);
    });

    //filters feature (happy path cases)
    test('Test input data in filter field', async ({page}) => {
        await filterP.searchFilter.fill('adidas');
    });






});