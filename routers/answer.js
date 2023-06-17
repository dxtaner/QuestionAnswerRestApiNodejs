const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAccessToRoute } = require("../middlewares/authorization/auth.js");
const { addNewAnswerToQuestion } = require("../controllers/answer.js");

router.post(
  "/",
  [getAccessToRoute],
  addNewAnswerToQuestion
);

module.exports = router;
