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
  deleteAnswer,
  likeAnswer,
  undoLikeAnswer,
} = require("../controllers/answer.js");
const {
  checkQuestionAndAnswerExist,
} = require("../middlewares/database/databaseErrorHelpers.js");

router.get("/", getAllAnswersByQuestion);
router.get("/:answer_id", checkQuestionAndAnswerExist, getSingleAnswer);

router.post("/", [getAccessToRoute], addNewAnswerToQuestion);

router.put(
  "/:answer_id/edit",
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  editAnswer
);
router.delete(
  "/:answer_id/delete",
  [checkQuestionAndAnswerExist, getAccessToRoute, getAnswerOwnerAccess],
  deleteAnswer
);

router.get(
  "/:answer_id/like",
  [checkQuestionAndAnswerExist, getAccessToRoute],
  likeAnswer
);
router.get(
  "/:answer_id/undo_like",
  [checkQuestionAndAnswerExist, getAccessToRoute],
  undoLikeAnswer
);

module.exports = router;
