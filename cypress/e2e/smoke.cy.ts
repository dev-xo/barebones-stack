/**
 * Example E2E Test.
 */
describe("Smoke test!.", () => {
  it("Should display Barebones welcome text.", () => {
    cy.visit("/")
    cy.findByText("Remix Stack")
  })
})
