import bcrypt from "bcryptjs";
const { genSalt, hash, compare } = bcrypt;

export const hashPassword = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const compareHashed = async (password, hashed) => {
  return await compare(password, hashed);
};
