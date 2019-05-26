const loginPage = require("../pages/loginPage.js");
const registrationPage = require("../pages/registrationPage.js");
const randomizer = require("../utility/randomizer.js");

let email = randomizer.createAlphanumeric(3) + "@email.com";
let password = "test";

let wrongEmail = randomizer.createAlphanumeric(3);

describe("The Login Page", () => {
  it("Enters bad login credentials", () => {
    loginPage.enterBadCredentials(wrongEmail, password);
  });
  it("Creates new user", () => {
    registrationPage.createNewUser(email, password);
  });
});
module.exports.email = email;
module.exports.password = password;
