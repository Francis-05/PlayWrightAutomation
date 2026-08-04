const randomEmail = `test${Date.now()}${Math.floor(Math.random() * 1000)}@g.com`;

module.exports = {

    regfieldCredentials : {
        fname: "John",
        lname: "Doe",
        email: randomEmail,
        phoneNum: "1234567890",
        password: "Admin#123",
        confirmPass: "Admin#123",
    },

    regdropdownOccupation : {
        occupation1: "Doctor",
        occupation2: "Student",
        occupation3: "Engineer", 
        occupation4: "Scientist",
    },

    passwordMismatch: {
        password: "Admin#123",
        confirmPass: "Admin#1234",
    }

};