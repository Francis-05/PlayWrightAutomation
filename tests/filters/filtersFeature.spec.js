const {test, expect} = require ('../../fixtures/fixture.js');
const baseUrls = require ('../../data/urls.js');
const messages = require ('../../constants/filters/filtersMessages.js');
const testData = require ('../../data/filters/filtersData.js');

test.describe('Filters Feature', () => {

    test.beforeEach(async ({ filterP, dashboardP }) => {
        await filterP.goto(baseUrls.dashboardURL.url);
        await dashboardP.waitProductLoad();
    });

    //filters feature (happy path cases)
    test.describe('Happy Path TestCase', () => {
        test('TC_FLT_001: Verify text search filters products correctly by product searched', async ({ filterP, dashboardP }) => {
            const items = Object.values(testData.searchItems);

            for(const item of items) {
                await filterP.searchProduct(item);
                await expect(dashboardP.productTitle).toContainText(item);
                await filterP.clearSearchField();
            }
        });

        test('TC_FLT_002: Verify filtering by category displays correct products', async ({ filterP, dashboardP }) => {
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

        test('TC_FLT_003: Verify filtering by price range displays products within range', async ({ filterP, dashboardP }) => {
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

        test('TC_FLT_004: Verify filtering by sub-category displays correct products', async ({ filterP, dashboardP }) => {
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

        test('TC_FLT_005: Verify filtering by search-For displays correct products', async ({ filterP, dashboardP }) => {
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

        test('TC_FLT_006: Verify if using search, price range and categories filter data display correctly', async ({ filterP, dashboardP }) => {
            await filterP.searchProduct(testData.searchItems.shoeItems);
            await filterP.filterPriceRange(testData.searchPriceRange.minPrice, testData.searchPriceRange.maxPrice);
            await filterP.selectCategories(testData.searchCategories.fashion);

            const productCount = await dashboardP.productCards.count();

            if(productCount === 0) {
                await expect(dashboardP.toastMessage).toHaveText(messages.containerMessages.floatNoProduct);
            } else {
                const products = await dashboardP.getAllproductCards();
                await expect(products.length).toBe(productCount);
            }
        });
    });

    //filters feature (negative cases)
    test.describe('Negative TestCases', () => {
        test('TC_FLT_NEG_001: Verify search with non-existent product name displays no results', async ({ filterP, dashboardP}) => {
            await filterP.searchProduct(testData.incorrectDataInput.nonExistentData);
            await expect(dashboardP.productCards).toHaveCount(0);
            await expect(dashboardP.toastMessage).toHaveText(messages.containerMessages.floatNoProduct);
        });

        test('TC_FLT_NEG_002: Verify search with special characters', async ({ filterP, dashboardP}) => {
            await filterP.searchProduct(testData.incorrectDataInput.specialChar);
            await expect(dashboardP.productCards).toHaveCount(0);
            await expect(dashboardP.toastMessage).toHaveText(messages.containerMessages.floatNoProduct);
        });


    });





});