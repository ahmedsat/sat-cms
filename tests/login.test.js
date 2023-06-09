import chai from "chai";
import chaiHttp from "chai-http";
import app from "../src/server.js";
import { createRandomUser } from "./helpers/fake-user.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("/api/v1/register", () => {});
