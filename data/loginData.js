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

    errorMessage: {
        floatError: "Incorrect email or password.",
    },

    feedbackErrors: {
        emailInvalid: "*Enter Valid Email",
        emailError : "*Email is required",
        passwordError : "*Password is required",

    },

    loginPlaceholders: {
        email: "email@example.com",
        password: "enter your passsword",
    }

};