describe("Sign in flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Sign In").click();
  });
  it("Can go to sign in page", () => {
    cy.url().should("include", "/auth/signIn");
  });
  it("Can sign in and sign out", () => {
    cy.get("input[type=username]").type("kiethseng");
    cy.get("input[type=password]").type("012858378");

    // Ignore fetch to profile picture url
    cy.intercept(
      "https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg",
      (req) => req.destroy()
    );

    cy.get("button").contains("Sign In").click();

    cy.url().should("include", "/v2/todos");
    cy.getAllCookies()
      .should("have.length", 3)
      .then((cookies) => {
        expect(
          cookies.find((cookie) => cookie.name === "next-auth.session-token")
        ).to.exist;
      });

    cy.get("div[id=account-container]").click();
    cy.contains("Sign Out").click();
    cy.get("button[type=submit]").click();

    cy.getAllCookies()
      .should("have.length", 2)
      .then((cookies) => {
        expect(
          cookies.find((cookie) => cookie.name === "next-auth.session-token")
        ).to.not.exist;
      });
  });
});

describe("Sign up flow", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.contains("Sign Up").click();
  });
  it("can sign up a user", () => {
    const newUser = {
      name: "Test",
      email: "test@example.com",
      username: "test",
      password: "foo12345",
    };
    cy.get("input[type=name]").type(newUser.name);
    cy.get("input[type=email]").type(newUser.email);
    cy.get("input[type=username]").type(newUser.username);
    cy.get("input[type=password]").type(newUser.password);

    cy.get("button").contains("Sign Up").click();

    cy.url().should("include", "/auth/signIn");

    cy.get("input[type=username]").type(newUser.username);
    cy.get("input[type=password]").type(newUser.password);

    // Ignore fetch to profile picture url
    cy.intercept(
      "https://i.pinimg.com/222x/57/70/f0/5770f01a32c3c53e90ecda61483ccb08.jpg",
      (req) => req.destroy()
    );

    cy.get("button").contains("Sign In").click();

    cy.url().should("include", "/v2/todos");
  });
});
