const express = require("express");
const {
  updateScore,
  getLeaderboard,
  resetScore,
} = require("../controllers/score");
const router = express.Router();

router.route("/update").patch(updateScore);
router.route("/reset").patch(resetScore);
router.route("/leaderboard").get(getLeaderboard);

module.exports = router;
