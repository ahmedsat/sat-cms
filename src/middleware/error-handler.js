import { StatusCodes } from "http-status-codes";

export const ErrorHandler = (err, req, res, next) => {
  let Error = {
    message: err.message || "Internal server error",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === "ValidationError") {
    Error = {
      message: Object.values(err.errors)
        .map((error) => error.message)
        .join(", "),
      statusCode: StatusCodes.BAD_REQUEST,
    };
  }

  if (err.code && err.code === 11000) {
    Error.message = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    Error.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === "CastError") {
    Error.message = `No item found with id : ${err.value}`;
    Error.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(Error.statusCode).json({
    message: Error.message,
  });
};
