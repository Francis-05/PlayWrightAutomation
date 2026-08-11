const { basePage } = require('../basePage.js');

class filtersPage extends basePage {
    constructor (page) {
        super(page);

        this.searchFilter = page.getByPlaceholder('search').nth(1);

    }

}

module.exports = { filtersPage };