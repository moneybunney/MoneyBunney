class registrationPage {
  // create user using the UI
  createNewUser(email, password) {
    cy.visit("/register");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('input[name="passwordConfirmation"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/dashboard");
  }
}
module.exports = new registrationPage();
