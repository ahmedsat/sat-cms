import { StatusCodes } from "http-status-codes";

export const notFoundError = (message) => {
  const err = new Error(message);
  err.statusCode = StatusCodes.NOT_FOUND;
  return err;
};

export const badRequestError = (message) => {
  const err = new Error(message);
  err.statusCode = StatusCodes.BAD_REQUEST;
  return err;
};

export const unauthenticatedError = (message) => {
  const err = new Error(message);
  err.statusCode = StatusCodes.UNAUTHORIZED;
  return err;
};
