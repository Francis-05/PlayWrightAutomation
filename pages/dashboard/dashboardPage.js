const { basePage } = require ('../basePage');

class dashboardPage extends basePage {
    constructor (page) {
        super(page);

        this.productCards = page.locator('div.card div.card-body h5');
    }

    async waitProductLoad() {
        await this.productCards.first().waitFor({ state: 'visible' });
    }

    async getAllproducts() {
        return await this.productCards.allTextContents();
    }
}

module.exports = { dashboardPage };