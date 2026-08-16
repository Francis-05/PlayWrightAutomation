const { basePage } = require ('../basePage');

class dashboardPage extends basePage {
    constructor (page) {
        super(page);

        this.productTitle = page.locator('div.card div.card-body b');
        this.productCards = page.locator('div.card')
    }

    async waitProductLoad() {
        await this.productCards.first().waitFor({ state: 'visible' });
    }

    async getAllproductTitle() {
        return await this.productTitle.allTextContents();
    }

    async getAllproductCards() {
        return await this.productCards.all();
    }

}

module.exports = { dashboardPage };