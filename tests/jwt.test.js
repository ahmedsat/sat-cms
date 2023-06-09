import { assert } from "chai";
import { CreateJWT, VerifyJWT } from "../src/utils/gwt.js";
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
    assert.equal(decoded.id, user["_id"]);
    assert.equal(decoded.username, user["username"]);
  });
});
