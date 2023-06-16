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

module.exports = {
  askNewQuestion,
};
