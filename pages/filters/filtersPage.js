const { basePage } = require('../basePage.js');

class filtersPage extends basePage {
    constructor (page) {
        super(page);

        this.searchInput = page.getByRole('textbox', { name: 'search', exact: true }).nth(1);
        this.productCards = page.locator('div.col-lg-4 div.card div.card-body h5');

    }

    async searchProduct(item) {
        this.searchInput.fill(item);
        this.searchInput.press('Enter');
    }

    async waitProductLoad() {
        await this.productCards.first().waitFor({ state: 'visible' });
    }

    async getAllproducts() {
        return await this.productCards.allTextContents();
    }

}

module.exports = { filtersPage };