import { assert } from "chai";
import { CreateJWT, VerifyJWT } from "../src/utils/jwt.js";
import { createRandomUser } from "./helpers/fake-user.js";

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

  it("should return error massage : Signature verification failed", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InltSUQiLCJ1c2VybmFtZSI6IlJhY2hlbF9Nb2VuLUxlZG5lcjMiLCJpYXQiOjE2ODY2NjEzMDEsImV4cCI6MTY4NjY5MDEwMX0.qgr9NaaFD8CjEramidt3heOsyyQggD1zkBkmoecyvAY";
    const decoded = VerifyJWT(token);
    console.log(decoded.error);
    assert.equal(decoded.error, "Signature verification failed");
  });

  // more tests to be added
  //    Signature verification failed
  //    Invalid algorithm
  //    Expired token
  //    Invalid issuer
});
