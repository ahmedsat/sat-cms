import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("/api/v1/register", () => {
  it("should register a new user", (done) => {
    const user = {
      username: "testuser",
      password: "testpassword",
      email: "testuser@example.com",
    };

    chai
      .request(app)
      .post("/api/v1/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "User registered successfully"
        );
        expect(res.body).to.has.property("id");
        expect(res.body).to.has.property("token");
        done();
      });
  });
});
