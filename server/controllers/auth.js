const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");

const register = async (req, res) => {
  await User.create(req.body);
  res.status(StatusCodes.CREATED).send();
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError(`No user with email ${email}`);
  }

  const isPasswordCorrect = await user.comparePasswords(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Incorrect password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ token, name: user.name });
};

module.exports = { login, register };
