import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";
import { createRandomUser } from "./helpers/fake-user.js";
import { StatusCodes } from "http-status-codes";

chai.use(chaiHttp);
const { expect } = chai;

describe("/api/v1/login", () => {
  const user = createRandomUser();

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
        done();
      });
  });

  it("should login user successfully using username an password", (done) => {
    chai
      .request(app)
      .post("/api/v1/login")
      .send({ username: user.username, password: user.password })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("should login user successfully using email an password", (done) => {
    chai
      .request(app)
      .post("/api/v1/login")
      .send({ email: user.email, password: user.password })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("should login user successfully using id an password", (done) => {
    chai
      .request(app)
      .post("/api/v1/login")
      .send({ id: user.id, password: user.password })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("should return error for missing email", (done) => {
    chai
      .request(app)
      .post("/api/v1/login")
      .send({ password: user.password })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.BAD_REQUEST);
        expect(res.body).have.property(
          "message",
          "Email and password are required"
        );
        done();
      });
  });

  it("should return error for missing password", (done) => {
    chai
      .request(app)
      .post("/api/v1/login")
      .send({ email: user.email })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.BAD_REQUEST);
        expect(res.body).have.property(
          "message",
          "Email and password are required"
        );
        done();
      });
  });

  it("should return error for wrong password", (done) => {
    chai
      .request(app)
      .post("/api/v1/login")
      .send({ username: user.username, password: "wrong password" })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.UNAUTHORIZED);
        expect(res.body).have.property("message", "Invalid password");
        done();
      });
  });

  it("should return error for wrong username", (done) => {
    chai
      .request(app)
      .post("/api/v1/login")
      .send({ username: "someOne", password: user.password })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.NOT_FOUND);
        expect(res.body).have.property("message", "User not found");
        done();
      });
  });
});
