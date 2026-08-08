module.exports = {
    
    validUser: {
        email: process.env.LOGIN_EMAIL,
        password: process.env.LOGIN_PASSWORD,
    },

    unregisteredUser: {
        email: "incorrectuser@g.com",
        password: "admin###123",
    },

    invalidPasswordUser: {
        email: process.env.LOGIN_EMAIL,
        password: "incorrectpass"
    },

    invalidEmailFormat: {
        email: "franz.rose225@@@gmail.com",
        password: "admin###123",
    },

};