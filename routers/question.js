const express = require("express");
const Question = require("../models/Question.js");
const answer = require("./answer.js");

const {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
  deleteQuestion,
  likeQuestion,
  undoLikeQuestion,
} = require("../controllers/question.js");

const {
  getAccessToRoute,
  getQuestionOwnerAccess,
} = require("../middlewares/authorization/auth.js");

const {
  checkQuestionExist,
} = require("../middlewares/database/databaseErrorHelpers.js");

const questionQueryMiddleware = require("../middlewares/query/questionQueryMiddleware.js");
const answerQueryMiddleware = require("../middlewares/query/answerQueryMiddleware.js");

const router = express.Router();

router.get(
  "/",
  questionQueryMiddleware(Question, {
    population: {
      path: "user",
      select: "name title age place profile_image",
    },
  }),
  getAllQuestions
);
router.get(
  "/:id",
  checkQuestionExist,
  answerQueryMiddleware(Question, {
    array: "answers",
    populate: [
      {
        path: "user",
        select: "name title age place profile_image",
      },
      {
        path: "answers",
        populate: {
          path: "user",
          select:"name title profile_image"
        },
        select: "content user",
      },
    ],
  }),
  getSingleQuestion
);
router.post("/ask", getAccessToRoute, askNewQuestion);
router.put(
  "/:id/edit",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  editQuestion
);
router.delete(
  "/:id/delete",
  [getAccessToRoute, checkQuestionExist, getQuestionOwnerAccess],
  deleteQuestion
);
router.get("/:id/like", [getAccessToRoute, checkQuestionExist], likeQuestion);
router.get(
  "/:id/undo_like",
  [getAccessToRoute, checkQuestionExist],
  undoLikeQuestion
);

router.use("/:question_id/answers", checkQuestionExist, answer);

module.exports = router;
