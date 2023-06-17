const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAccessToRoute } = require("../middlewares/authorization/auth.js");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswer,
} = require("../controllers/answer.js");
const {
  checkQuestionAndAnswerExist,
} = require("../middlewares/database/databaseErrorHelpers");

router.post("/", [getAccessToRoute], addNewAnswerToQuestion);

router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);

module.exports = router;
