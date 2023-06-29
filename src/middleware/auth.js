import { VerifyJWT } from "../utils/jwt.js";
import { unauthenticatedError } from "../utils/errors.js";
import { User } from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw unauthenticatedError("token is not valid");
  }

  const token = authorization.split("Bearer ")[1];

  const decoded = VerifyJWT(token);

  if (decoded.error) throw unauthenticatedError(decoded.error);

  const user = await User.findById(decoded.id);

  req.user = user.toObject();

  next();
};

//  message: "you need to login";
