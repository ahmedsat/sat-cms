// ESM
import { faker } from "@faker-js/faker";

// CJS
// const { faker } = require("@faker-js/faker");

export function createRandomUser() {
  return {
    user: faker.person.fullName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// export const USERS[] = faker.helpers.multiple(createRandomUser, {
//   count: 5,
// });
