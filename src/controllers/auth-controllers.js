import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";

export const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.CreateJWT();
  res.status(StatusCodes.CREATED).json({
    message: "User registered successfully",
    id: user._id,
    name: user.name,
    token: token,
  });
};
