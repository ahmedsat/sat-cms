import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";
import { CreateJWT } from "../utils/jwt.js";
import {
  notFoundError,
  badRequestError,
  unauthenticatedError,
} from "../utils/errors.js";
import { compareHashed } from "../utils/password.js";

export const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = CreateJWT(user);
  res.status(StatusCodes.CREATED).json({
    message: "User registered successfully",
    id: user._id,
    name: user.name,
    token: token,
  });
};

export const login = async (req, res) => {
  const { username, email, id, password } = req.body;

  // if now email or username or id provided
  if ((!username && !email && !id) || !password)
    throw badRequestError("Email and password are required");

  let user;

  if (id) {
    user = await User.findById(id);
  }

  if (!user && username) {
    user = await User.findOne({ username });
  }

  if (!user && email) {
    user = await User.findOne({ email });
  }

  if (!user) throw notFoundError("User not found");

  if (!(await compareHashed(password, user.password)))
    throw unauthenticatedError("Invalid password");

  const token = CreateJWT(user);

  res.json({ name: user.name, id: user._id, token: token });
};

export const me = (req, res) => {
  const { user } = req;
  res
    .status(StatusCodes.OK)
    .json({ username: user.username, name: user.name, id: user._id });
};
