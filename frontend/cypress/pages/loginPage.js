class loginPage {
  enterBadCredentials(email, password) {
    cy.visit("/"); // change URL to match your dev URL
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.get("#root").should("contain", "Wrong password");
  }
  enterCredentials(email, password) {
    cy.visit("/"); // change URL to match your dev URL
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  }
}
module.exports = new loginPage();
