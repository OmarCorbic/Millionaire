const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const User = require("../models/User");

const updateScore = async (req, res) => {
  const {
    body: { isMillionaire },
    user: loggedUser,
  } = req;

  if (!loggedUser) {
    throw new UnauthenticatedError("You are not logged in");
  }

  if (!isMillionaire) {
    throw new BadRequestError("You must win the game");
  }

  const user = await User.findOneAndUpdate(
    { _id: loggedUser.id },
    { $inc: { timesMillionaire: 1 }, $inc: { winStreak: 1 } },
    {
      runValidators: true,
      new: true,
    }
  );

  res
    .status(StatusCodes.OK)
    .json({ message: `Successfully updated the score of user ${user.name}` });
};

// how to protect user from invoking the update without winning the game
// make 2 enpdoints for increasing and reseting the score and make 2 async thunks or make one for updating the score
const resetScore = async (req, res) => {
  const { user: loggedUser } = req;

  if (!loggedUser) {
    throw new UnauthenticatedError("You are not logged in");
  }

  const user = await User.findOneAndUpdate(
    { id: loggedUser.userId },
    { $set: { winStreak: 0 } }
  );

  res
    .status(StatusCodes.OK)
    .json({ message: `Successfully reset the streak of user ${user.name}` });
};

const getLeaderboard = async (req, res) => {
  const users = await User.find({})
    .select("name timesMillionaire winStreak")
    .sort("-timesMillionaire")
    .limit(10);
  res.status(StatusCodes.OK).json({ users });
};

module.exports = { updateScore, resetScore, getLeaderboard };
