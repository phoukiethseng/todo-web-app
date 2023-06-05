describe("Todos Page", () => {
  const newTodo = {
    title: "FooBar",
  };
  beforeEach(() => {
    cy.visit("http://localhost:3000/auth/signIn");
    cy.get("input[type=username]").type("kiethseng");
    cy.get("input[type=password]").type("012858378");
    cy.get("button").contains("Sign In").click();
    cy.url().should("include", "/v2/todos");
  });

  it("should be able to add and delete todo", () => {
    // Add
    cy.get("input").type(newTodo.title).type("{enter}");
    cy.get("ul li").contains(newTodo.title).should("exist");

    // Delete
    cy.contains(newTodo.title)
      .closest(".todo-card")
      .find(".todo-delete")
      .click();
    cy.contains(newTodo.title).should("not.exist");
  });

  it("shoud be able to complete todo", () => {
    // Add
    cy.get("input").type(newTodo.title).type("{enter}");
    cy.get("ul li").contains(newTodo.title).should("exist");

    // Complete
    cy.contains(newTodo.title)
      .closest(".todo-card")
      .find(".todo-complete")
      .click();

    cy.contains(newTodo.title).siblings().should("contain.text", "Completed");

    // Delete
    cy.contains(newTodo.title)
      .closest(".todo-card")
      .find(".todo-delete")
      .click();
    cy.contains(newTodo.title).should("not.exist");
  });

  it("Add empty todo won't trigger fetch (Press Enter)", () => {
    cy.get("ul.todos-list")
      .children()
      .its("length")
      .then((length) => {
        cy.get("input").type("{enter}");
        cy.get("ul.todos-list").children().should("have.length", length);
      });
  });
  it("Add empty todo won't trigger fetch (Click Add Button)", () => {
    cy.get("ul.todos-list")
      .children()
      .its("length")
      .then((length) => {
        cy.get("button").contains("Add").click();
        cy.get("ul.todos-list").children().should("have.length", length);
      });
  });
});
