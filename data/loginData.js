module.exports = {
    
    validUser: {
        email: "franz.rose225@gmail.com",
        password: "admin###123",
    },

    unregisteredUser: {
        email: "incorrectuser@g.com",
        password: "admin###123",
    },

    invalidPasswordUser: {
        email: "franz.rose225@gmail.com",
        password: "incorrectpass"
    },

    invalidEmailFormat: {
        email: "franz.rose225@@@gmail.com",
        password: "admin###123",
    },

};