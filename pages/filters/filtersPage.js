const { basePage } = require('../basePage.js');

class filtersPage extends basePage {
    constructor (page) {
        super(page);

        this.clickDashboard = page.locator('app-dashboard:visible');
        this.searchInput = page.getByRole('textbox', { name: 'search' });
        this.fashionCheckbox = page.locator('div.form-group:visible').filter({ hasText: 'fashion' }).locator('input[type="checkbox"]');
        this.electronicsCheckbox = page.locator('div.form-group').filter({ hasText: 'electronics' }).locator('input[type="checkbox"]');
        this.householdCheckbox = page.locator('div.form-group').filter({ hasText: 'household' }).locator('input[type="checkbox"]');
    }

    async searchProduct(keyword) {
        await this.searchInput.fill(keyword);
        await this.searchInput.press('Enter');
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
        }
    }




}

module.exports = { filtersPage };