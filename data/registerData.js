function generateUniqueEmail () {
    return `test${Date.now()}${Math.floor(Math.random() * 1000)}@g.com`;
}

module.exports = {
    
    generateUniqueEmail,

    regfieldCredentials : {
        fname: "John",
        lname: "Doe",
        phoneNum: "1234567890",
        password: "Admin#123",
        confirmPass: "Admin#123",
    },

    alreadyRegisteredUser : {
        fname: "John",
        lname: "Doe",
        email: "franz.rose225@gmail.com",
        phoneNum: "1234567890",
        password: "Admin#123",
        confirmPass: "Admin#123",
    },

    regdropdownOccupation : {
        doctor: "Doctor",
        student: "Student",
        engineer: "Engineer", 
        scientist: "Scientist",
    },

    passwordMismatch: {
        password: "Admin#123",
        confirmPass: "Admin#1234",
    },

    regGender: {
        male: "Male",
        female: "Female",
    },

};