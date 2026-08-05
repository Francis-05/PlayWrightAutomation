class basePage {
    constructor (page) {
        this.page = page;

        this.toastMessage = page.locator('#toast-container');
    }

    async goto(url) {
        await this.page.goto(url);
    }
}

module.exports = { basePage };