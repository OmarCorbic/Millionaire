const { StatusCodes } = require("http-status-codes");

const routeNotFoundMiddleware = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Route not found");
};

module.exports = routeNotFoundMiddleware;
