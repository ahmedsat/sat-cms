import { assert } from "chai";
import { hashPassword, compareHashed } from "../src/utils/password.js";

describe("Password Hashing", function () {
  it("should hash a password", async function () {
    const password = "myPassword";
    const hashed = await hashPassword(password);
    assert.isString(hashed);
  });

  it("should compare a hashed password", async function () {
    const password = "myPassword";
    const hashed = await hashPassword(password);
    const isMatch = await compareHashed(password, hashed);
    assert.isTrue(isMatch);
  });
});
