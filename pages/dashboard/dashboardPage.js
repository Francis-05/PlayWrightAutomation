const { basePage } = require ('../basePage');

class dashboardPage extends basePage {
    constructor (page) {
        super(page);

        this.productTitle = page.locator('div.card div.card-body b');
        this.productCards = page.locator('div.card')
        this.productPrices = page.locator('div.card div.card-body [style="font-weight: 300;"]');

        this.homeNav = page.getByRole('button', { name: 'HOME' });
        this.ordersNav = page.getByRole('button', { name: 'ORDERS' });
        this.cartNav = page.getByText('Cart', { exact: true });
        this.signOutNav = page.getByRole('button', { name: 'Sign Out' });

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

    async getAllPrices() {
        return await this.productPrices.all();
    }

    async navigateTabBar(navigate) {
        const categoriesMap = {
            HOME: this.homeNav,
            ORDERS: this.ordersNav,
            Cart: this.cartNav,
            'Sign Out': this.signOutNav,
        }
        const button = categoriesMap[(navigate)];
        if(button) {
            await button.click();
            await this.page.waitForTimeout(1000)
        } else {
            throw new Error(`Unknown navigate bar: "${navigate}"`);
        }
    }

}

module.exports = { dashboardPage };