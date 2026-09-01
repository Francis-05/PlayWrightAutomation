const { reverse } = require("node:dns");

module.exports = {

    searchItems: {
        shoeItems: "ADIDAS ORIGINAL",
        dressItems: "ZARA COAT 3",
        deviceItems: "iphone 13 pro",
    },

    searchPriceRange: {
        minPrice: "10000",
        maxPrice: "12000", 
    },

    searchCategories: {
        fashion: "fashion",
        electronics: "electronics",
        household: "household",
    },

    searchSubCategories: {
        tshirt: "t-shirts",
        shirts: "shirts",
        shoes: "shoes",
        mobiles: "mobiles",
        laptops: "laptops",
    },

    searchFor: {
        men: "men",
        women: "women",
    },

    incorrectDataInput: {
        nonExistentData: "NonExistentItem12345XYZ",
        specialChar: "!@#$%^&*()_+",
        emptySearch: " ",
    },

    reversePriceRange: {
        minPrice: "50000",
        maxPrice: "10000",
    },
    
}