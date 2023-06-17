const Answer = require("../models/Answer.js");
const Question = require("../models/Question.js");

const errorWrapper = require("../helpers/error/errorWrapper.js");
const CustomError = require("../helpers/error/customError.js");

const addNewAnswerToQuestion = errorWrapper(async (req, res, next) => {
  const { question_id } = req.params;
  const user_id = req.user.id;

  const information = req.body;

  const answer = await Answer.create({
    ...information,
    question: question_id,
    user: user_id,
  });

  res.status(200).json({
    success: true,
    data: answer,
  });
});

const getAllAnswersByQuestion = errorWrapper(async (req, res, next) => {
  const { question_id } = req.params;

  const question = await Question.findById(question_id).populate("answers");

  const answers = question.answers;

  res.status(200).json({
    success: true,
    answerCount: answers.length,
    data: answers,
  });
});

module.exports = {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
};
