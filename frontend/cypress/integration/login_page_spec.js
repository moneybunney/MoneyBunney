describe("The Login Page", function() {
  it("Fails on bad login credentials", function() {
    cy.visit("/"); // change URL to match your dev URL
    cy.get('input[name="email"]').type("Nonexistent email");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();

    cy.wait(3000);

    cy.url().should("include", "/login");
  });
});
