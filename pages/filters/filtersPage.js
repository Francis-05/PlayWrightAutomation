const { basePage } = require('../basePage.js');

class filtersPage extends basePage {
    constructor (page) {
        super(page);

        this.searchInput = page.getByRole('textbox', { name: 'search' });

    }

    async searchProduct(keyword) {
        await this.searchInput.fill(keyword);
        await this.searchInput.press('Enter', { delay: 1000 });
    }

}

module.exports = { filtersPage };