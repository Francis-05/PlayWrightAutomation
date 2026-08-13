const { test, expect } = require ('@playwright/test');
const { filtersPage } = require ('../../pages/filters/filtersPage.js');
const { dashboardPage } = require ('../../pages/dashboard/dashboardPage.js');
const baseUrls = require ('../../data/urls.js');
const testData = require ('../../data/filters/filtersData.js');


test.describe('Filters Feature', () => {

    let filterP;
    let dashboardP;

    test.beforeEach(async ({ page }) => {
        filterP = new filtersPage(page);
        dashboardP = new dashboardPage(page);

        await filterP.goto(baseUrls.dashboardURL.url);
        await dashboardP.waitProductLoad();
    });

    //filters feature (happy path cases)
    test.describe('Happy Path TestCase', () => {
        test('TC_FLT_001: Verify text search filters products correctly by keyword', async ({page}) => {
            await filterP.searchProduct(testData.searchItems.shoeItems);

            await expect(dashboardP.productCards.first()).toContainText(testData.searchItems.shoeItems);

            const products = await dashboardP.getAllproducts();

            await expect(products.length).toBeGreaterThan(0);
            for(const product of products) {
                await expect(product.toUpperCase()).toContain(testData.searchItems.shoeItems.toUpperCase());
            }
        });

    });






});