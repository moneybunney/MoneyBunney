const accountsPage = require("../pages/accountsPage.js");
const loginPage = require("../pages/loginPage.js");
const transactionsPage = require("../pages/transactionsPage.js");
const randomizer = require("../utility/randomizer.js");
const credentials = require("./login");

let accountName = randomizer.createAlphanumeric(5);
let initialBalance = randomizer.createNumeric(3);
describe("Transaction creation", () => {
  it("Creates new account", () => {
    loginPage.enterCredentials(credentials.email, credentials.password);
    accountsPage.createAccount(accountName, initialBalance);
  });

  it("Adds new transaction", () => {
    loginPage.enterCredentials(credentials.email, credentials.password);
    transactionsPage.addTransaction(accountName);
  });
});
