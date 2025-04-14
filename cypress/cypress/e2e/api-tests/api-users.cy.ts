context("GET /user", () => {
  it("gets a list of user", () => {
    cy.request("GET", "http://localhost:3300/api/user/get-info/")
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).length.to.be.greaterThan(1);
      })
      .then((response) => {
        cy.writeFile(
          "cypress/fixtures/user.json",
          JSON.stringify(response.body[0], null, 2)
        );
      });
  });
});

context("GET /user/:uid", () => {
  it("gets a user", () => {
    var uid = cy.fixture("user.json").then((dataExtract) => {
      cy.log("dataExtract", dataExtract);
      var uid = dataExtract.uid;

      cy.request("GET", "http://localhost:3300/api/user/get-info/" + uid).then(
        (response) => {
          expect(response.status).to.eq(200);
          expect(response.body).ownProperty("uid");
        }
      );
    });
  });
});

// TODO: Resolve Firebase Auth first up
// context("POST /user/update-info/:uid", () => {
//   it("updates a user", () => {
//     var uid = cy.fixture("user.json").then((dataExtract) => {
//       cy.log("dataExtract", dataExtract);
//       var uid = dataExtract.uid;

//       cy.request("POST", "http://localhost:3300/api/user/update-info/:uid", {
//         username: "whatever",
//       }).then((response) => {
//         // response.body is automatically serialized into JSON
//         expect(response.body).to.have.property("username", "whatever"); // true
//       });
//     });
//   });
// });
