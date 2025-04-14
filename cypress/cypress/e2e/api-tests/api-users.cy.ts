context("GET /customer", () => {
  it("gets a list of customer", () => {
    cy.request("GET", "http://localhost:3300/api/customer/get-info/").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).length.to.be.greaterThan(1);
      }
    );
  });
});
