class transactionsPage {
  addTransaction(accountName) {
    //visits the create transaction page
    cy.visit("/transactions");
    cy.get('button[aria-label="Add"]').click();

    //enters necessary information
    cy.get("#select-category").click();
    cy.xpath(`//*[@id="menu-category"]/div[2]/ul/li[1]`).click();
    cy.get('input[name="amount"]').type(100);
    cy.get("#select-account").invoke("text", accountName);
    cy.get("#description").type(accountName + "test");

    //submits the transaction
    cy.get('button[type="submit"]').click();

    //expects it to appear on transactions page
    cy.url().should("include", "/transactions");
    cy.get("#root").should("contain", accountName + "test");
  }
}
module.exports = new transactionsPage();
