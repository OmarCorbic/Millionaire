const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
  const customError = {
    message: err.message || "Something went wrong. Please try again later",
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.code && err.code === 11000) {
    customError.message = `User with that ${Object.keys(
      err.keyValue
    )} already exist`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // if (err.name && err.name === "CastError") {
  //   customError.message = `Invalid types`;
  //   customError.statusCode = StatusCodes.NOT_FOUND;
  // }

  if (err.name && err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(customError.statusCode).json({ msg: customError.message });
};

module.exports = errorHandlerMiddleware;
