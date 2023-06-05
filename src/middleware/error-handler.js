import { StatusCodes } from "http-status-codes";

export const ErrorHandler = (err, req, res, next) => {
  let Error = {
    message: err.message || "Internal server error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };
  //
  if (err.name === "ValidationError") {
    Error = {
      message: Object.values(err.errors)
        .map((error) => error.message)
        .join(", "),
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }
  //
  return res.status(Error.statusCode).json({
    message: Error.message,
  });
};
