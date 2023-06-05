import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";
import { createRandomUser } from "./helpers/fake-user.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("/api/v1/register", () => {
  it("should register a new user", (done) => {
    const user = createRandomUser();

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
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("token");
        done();
      });
  });

  it("should return an error for missing fields", (done) => {
    const user = createRandomUser();
    delete user.email;
    chai
      .request(app)
      .post("/api/v1/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "Missing email field");
        done();
      });
  });

  it("should return an error for invalid email format", (done) => {
    const user = createRandomUser();
    user.email = "invalid email";

    chai
      .request(app)
      .post("/api/v1/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("message", "Invalid email format");
        done();
      });
  });

  it("should return an error for name field to be too short", (done) => {
    const user = createRandomUser();
    user.name = "n";
    chai
      .request(app)
      .post("/api/v1/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property(
          "message",
          "Name field is shorter than the minimum allowed length (6)"
        );
        done();
      });
  });

  it("should return an error for duplicate data", (done) => {
    const user1 = createRandomUser();
    const user2 = createRandomUser();
    user2.username = user1.username;

    chai
      .request(app)
      .post("/api/v1/register")
      .send(user1)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "User registered successfully"
        );
        expect(res.body).to.have.property("id");
        expect(res.body).to.have.property("token");
        done();
      });

    chai
      .request(app)
      .post("/api/v1/register")
      .send(user)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(400);
        expect(res.body).to.have.property(
          "message",
          "Username is already used"
        );
        done();
      });
  });
});
