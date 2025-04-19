const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server"); // Assuming server.js is in the root
const should = chai.should();

chai.use(chaiHttp);

describe("/GET /api/cases", () => {
  it("it should GET all the cases", (done) => {
    chai
      .request(server)
      .get("/api/cases")
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a("array");
        done();
      });
  });
});
