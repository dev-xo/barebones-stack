/**
 * Example E2E Test.
 *
 * Besides the tests passes correctly, Cypress is giving us the following (uncaught exception) error:
 * Error: Hydration failed because the initial UI does not match what was rendered on the server.
 *
 * The team is working on it's fix already.
 * Check cypress/support/e2e for a detailed explanation.
 *
 */
describe("Smoke test!.", () => {
  it("Should display template name text.", () => {
    cy.visit("/");
    cy.findByText("Barebones Stack");
  });
});
