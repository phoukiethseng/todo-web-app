describe("Homepage navigation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/v2/home");
  });
  it("can navigate `About me` and `Web Technology`", () => {
    cy.contains("About").click();
    cy.url().should("include", "/v2/about");
    cy.contains("Web Technology").click();
  });
  it("click on `Getting Started` will goto sign in page", () => {
    cy.contains("Getting Started").click();
    cy.url().should("include", "/auth/signIn");
  });
});
