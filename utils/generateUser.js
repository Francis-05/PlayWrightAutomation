const { faker } = require ('@faker-js/faker');
const DEFAULT_PASSWORD = 'Admin123';

module.exports = {
    generateFname: () => faker.person.firstName(),
    generateLname: () => faker.person.lastName(),
    generateEmail: () => faker.internet.email(),
    generatePhoneNum: () => `19${faker.string.numeric(8)}`,
    password: DEFAULT_PASSWORD,
    confirmPass: DEFAULT_PASSWORD,
};