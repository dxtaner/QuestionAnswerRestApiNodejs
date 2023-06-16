const Question = require("../models/Question");

const errorWrapper = require("../helpers/error/errorWrapper.js");
const CustomError = require("../helpers/error/customError.js");

const askNewQuestion = errorWrapper(async (req, res, next) => {
  const information = req.body;

  const question = await Question.create({
    ...information,
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: question,
  });
});

const getAllQuestions = errorWrapper(async (req, res, next) => {
  const questions = await Question.find();

  return res.status(200).json({
    success: true,
    data: questions,
  });
});

const getSingleQuestion = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const question = await Question.findById(id);

  return res.status(200).json({
    success: true,
    data: question,
  });
});

const editQuestion = errorWrapper(async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  let question = await Question.findById(id);

  question.title = title;
  question.content = content;

  question = await question.save();

  res.status(200).json({
    success: true,
    data: question,
  });
});

module.exports = {
  askNewQuestion,
  getAllQuestions,
  getSingleQuestion,
  editQuestion,
};
