const { basePage } = require('../basePage.js');

class filtersPage extends basePage {
    constructor (page) {
        super(page);

        this.dashboardClick = page.locator('app-dashboard:visible');

        this.searchInput = page.getByRole('textbox', { name: 'search' });

        this.minPriceInput = page.getByRole('textbox', { name: 'Min Price' });
        this.maxPriceInput = page.getByRole('textbox', { name: 'Max Price' });

        this.fashionCheckbox = page.locator('div.form-group:visible').filter({ hasText: 'fashion' }).locator('input[type="checkbox"]');
        this.electronicsCheckbox = page.locator('div.form-group:visible').filter({ hasText: 'electronics' }).locator('input[type="checkbox"]');
        this.householdCheckbox = page.locator('div.form-group:visible').filter({ hasText: 'household' }).locator('input[type="checkbox"]');

        this.tshirtCheckbox = page.locator('div.form-group:visible').filter({ hasText: 't-shirts' }).locator('input[type="checkbox"]');
        this.shirtsCheckbox = page.locator('div.form-group:visible').filter({ hasText: /^shirts$/ }).locator('input[type="checkbox"]');
        this.shoesCheckbox = page.locator('div.form-group:visible').filter({ hasText: 'shoes' }).locator('input[type="checkbox"]');
        this.mobilesCheckbox = page.locator('div.form-group:visible').filter({ hasText: 'mobiles' }).locator('input[type="checkbox"]');
        this.laptopsCheckbox = page.locator('div.form-group:visible').filter({ hasText: 'laptops' }).locator('input[type="checkbox"]');

        this.forMen = page.locator('div.form-group:visible').filter({ hasText: /^men$/ }).locator('input[type="checkbox"]');
        this.forWomen = page.locator('div.form-group:visible').filter({ hasText: 'women' }).locator('input[type="checkbox"]');
    }

    async searchProduct(keyword) {
        await this.searchInput.fill(keyword);
        await this.searchInput.press('Enter');
        await this.page.waitForTimeout(1000);
    }

    async clearSearchField() {
        await this.searchInput.clear();
        await this.searchInput.press('Enter');
        await this.page.waitForTimeout(1000); 
    }

    async filterPriceRange(minPrice, maxPrice) {
        await this.minPriceInput.fill(minPrice);
        await this.maxPriceInput.fill(maxPrice);
        await this.dashboardClick.click();
        await this.page.waitForTimeout(1000);
    }

    async selectCategories(categories) {
        const categoriesMap = {
            fashion: this.fashionCheckbox,
            electronics: this.electronicsCheckbox,
            household: this.householdCheckbox,
        }
        const checkbox = categoriesMap[(categories.toLowerCase())];
        if(checkbox) {
            await checkbox.click();
            await this.page.waitForTimeout(1000)
        } else {
            throw new Error(`Unknown category: "${categories}"`);
        }
    }

    async selectSubCategories (subCategories) {
        const categoriesMap = {
            't-shirts': this.tshirtCheckbox,
            shirts: this.shirtsCheckbox,
            shoes: this.shoesCheckbox,
            mobiles: this.mobilesCheckbox,
            laptops: this.laptopsCheckbox,
        }
        const checkbox = categoriesMap[(subCategories.toLowerCase())];
        if(checkbox) {
            await checkbox.click();
            await this.page.waitForTimeout(1000);
        } else {
            throw new Error(`Unknown sub-category: "${subCategories}"`);
        }
    }

    async searchForMenWomen (searchFor) {
        const categoriesMap = {
            men: this.forMen,
            women: this.forWomen,
        }
        const checkbox = categoriesMap[(searchFor.toLowerCase())];
        if(checkbox) {
            await checkbox.click();
            await this.page.waitForTimeout(1000);
        } else {
            throw new Error(`Unknown search-For: "${searchFor}"`);
        }
    }




}

module.exports = { filtersPage };