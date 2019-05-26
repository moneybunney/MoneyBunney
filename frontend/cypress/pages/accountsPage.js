class accountsPage {
  createAccount(accountName, initialBalance) {
    cy.visit("/accounts");
    cy.get('button[aria-label="Add"]').click();
    cy.get('input[name="accountName"]').type(accountName);
    cy.get('input[name="initialBalance"]').type(initialBalance);
    cy.get('button[type="submit"]').click();

    cy.url().should("include", "/accounts");
    cy.get("#root").should("contain", accountName);
  }
}
module.exports = new accountsPage();
