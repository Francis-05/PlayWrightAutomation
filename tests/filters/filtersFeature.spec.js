const { test, expect } = require ('@playwright/test');
const { filtersPage } = require ('../../pages/filters/filtersPage.js');
const { dashboardPage } = require ('../../pages/dashboard/dashboardPage.js');
const baseUrls = require ('../../data/urls.js');
const messages = require ('../../constants/filters/filtersMessages.js');
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
        test('TC_FLT_001: Verify text search filters products correctly by product searched', async ({page}) => {
            const items = Object.values(testData.searchItems);

            for(const item of items) {
                await filterP.searchProduct(item);
                await expect(dashboardP.productTitle).toContainText(item);
                await filterP.clearSearchField();
            }
        });

        test('TC_FLT_002: Verify filtering by category (e.g fashion/electronics/household) displays correct products', async ({page}) => {
            const categories = Object.values(testData.searchCategories);

            for(const category of categories) {
                await filterP.selectCategories(category);
                const productCount = await dashboardP.productCards.count();

                if(productCount === 0) {
                    await expect(dashboardP.toastMessage).toHaveText(messages.containerMessages.floatNoProduct);
                } else {
                    const products = await dashboardP.getAllproductCards();
                    await expect(products.length).toBe(productCount);
                }
                
                await filterP.selectCategories(category);
            }
        });





    });






});