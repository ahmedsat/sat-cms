import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";
import { createRandomUser } from "./helpers/fake-user.js";
import { StatusCodes } from "http-status-codes";

chai.use(chaiHttp);
const { expect } = chai;

describe("/api/v1/me", () => {
  const user = createRandomUser();

  let token;

  it("should register a new user", (done) => {
    chai
      .request(app)
      .post("/api/v1/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(StatusCodes.CREATED);
        expect(res.body).to.have.property(
          "message",
          "User registered successfully"
        );
        user.id = res.body.id;
        expect(res.body).to.have.property("token");
        token = res.body.token;
        done();
      });
  });

  it("should return user data", (done) => {
    chai
      .request(app)
      .get("/api/v1/me")
      .set("authorization", "Bearer " + token)
      .send()
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.have.property("username", user.username);
        done();
      });
  });

  it("should return unauthorized error", (done) => {
    chai
      .request(app)
      .get("/api/v1/me")
      .send()
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
        expect(res.body).to.have.property("message", "token is not valid");
        done();
      });
  });
});
