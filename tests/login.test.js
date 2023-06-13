import chai, { should } from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";
import { createRandomUser } from "./helpers/fake-user.js";
import { StatusCodes } from "http-status-codes";
import { handleShutdownGracefully } from "../src/utils/graceful-shutdown.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("/api/v1/login", () => {
  after(() => {
    handleShutdownGracefully(app);
  });

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
        expect(res.body).to.have.property("token");
      });
    done();
  });
  it("should login user successfully using username an password", (done) => {
    chai
      .request(app)
      .post("/api/v1/login")
      .send({ username: user.username, password: user.password })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.have.property(
          "message",
          "User registered successfully"
        );
        expect(res.body).to.have.property("token");
        token = res.body.token;
      });
    done();
  });

  it("should return user data", (done) => {
    chai
      .request(app)
      .post("/api/v1/me")
      .set("authorization", "Bearer" + token)
      .send({ username: user.username, password: user.password })
      .end((err, res) => {
        expect(err).to.nested.null;
        expect(res).to.have.status(StatusCodes.OK);
        expect(res.body).to.have.property("username", user.username);
      });
    done();
  });
});
