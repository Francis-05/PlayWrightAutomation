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

        test('TC_FLT_002: Verify filtering by category displays correct products', async ({page}) => {
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

        test('TC_FLT_003: Verify filtering by price range displays products within range', async ({page}) => {
            await filterP.filterPriceRange(testData.searchPriceRange.minPrice, testData.searchPriceRange.maxPrice);
            const priceCount = await dashboardP.productPrices;
            const count = await priceCount.count();
            
            await expect(count).toBeGreaterThan(0);

            const minPrice = parseFloat(testData.searchPriceRange.minPrice);
            const maxPrice = parseFloat(testData.searchPriceRange.maxPrice);
            for (let i=0; i< count; i++) {
                const priceText = await priceCount.nth(i).textContent();

                const numericPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        
                expect(numericPrice).toBeGreaterThanOrEqual(minPrice);
                expect(numericPrice).toBeLessThanOrEqual(maxPrice);
            }
        });

        test('TC_FLT_004: Verify filtering by sub-category displays correct products', async ({page}) => {
            const subCategories = Object.values(testData.searchSubCategories);

            for(const subCat of subCategories) {
                await filterP.selectSubCategories(subCat);
                const productCount = await dashboardP.productCards.count();

                if(productCount === 0) {
                    await expect(dashboardP.toastMessage).toHaveText(messages.containerMessages.floatNoProduct);
                } else {
                    const products = await dashboardP.getAllproductCards();
                    await expect(products.length).toBe(productCount);
                }

                await filterP.selectSubCategories(subCat);
            }
        });

        test('TC_FLT_005: Verify filtering by search-For displays correct products', async ({}) => {
            const searchFor = Object.values(testData.searchFor);

            for(const search of searchFor) {
                await filterP.searchForMenWomen(search);
                const productCount = await dashboardP.productCards.count();

                if(productCount === 0) {
                    await expect(dashboardP.toastMessage).toHaveText(messages.containerMessages.floatNoProduct);
                } else {
                    const products = await dashboardP.getAllproductCards();
                    await expect(products.length).toBe(productCount);
                }

                await filterP.searchForMenWomen(search);
            }
        });


    });

});