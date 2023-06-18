const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAccessToRoute,
  getAnswerOwnerAccess,
} = require("../middlewares/authorization/auth.js");
const {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswer,
  editAnswer,
} = require("../controllers/answer.js");
const {
  checkQuestionAndAnswerExist,
} = require("../middlewares/database/databaseErrorHelpers.js");

router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);

router.post("/", [getAccessToRoute], addNewAnswerToQuestion);

router.put(
  "/:answer_id/edit",
  [checkQuestionAndAnswerExist,getAccessToRoute, getAnswerOwnerAccess],
  editAnswer
);

module.exports = router;
