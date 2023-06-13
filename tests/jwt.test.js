import { assert } from "chai";
import { config } from "dotenv"; // to load .env file
import { CreateJWT, VerifyJWT } from "../src/utils/jwt.js";
import { createRandomUser } from "./helpers/fake-user.js";
config();

describe("JWT", () => {
  const user = createRandomUser();
  user._id = "ymID";
  let token;

  it("should create JWT", () => {
    token = CreateJWT(user);
    assert.isString(token);
  });

  it("should validate JWT", () => {
    const decoded = VerifyJWT(token);
    assert.isUndefined(decoded.error);
    assert.equal(decoded.id, user["_id"]);
    assert.equal(decoded.username, user["username"]);
  });

  it("should return error massage : invalid signature", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InltSUQtbmV3IiwidXNlcm5hbWUiOiJMdXJhODYiLCJpYXQiOjE2ODY2OTcxMzF9.dfLW2PgVPGeJ5ZN0ChuJMTUImg6UrrnEXIKi5Sgyilc";
    const decoded = VerifyJWT(token);
    assert.equal(decoded.error, "invalid signature");
  });

  it("should return error massage : jwt expired", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InltSUQiLCJ1c2VybmFtZSI6IkpheWxhbjI4IiwiaWF0IjoxNjg2Njk4MDMxLCJleHAiOjE2ODY2OTgwMzJ9.2qGefyLP1xqwKM9VIxZqrNfrfJaoi07-aXu49jzCa7Y";
    const decoded = VerifyJWT(token);
    assert.equal(decoded.error, "jwt expired");
  });
});
