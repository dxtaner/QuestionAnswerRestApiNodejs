const path = require("path");
const root = path.dirname(require.main.filename);

const User = require(root + "/models/User.js");
const Question = require(root + "/models/Question.js");
const Answer = require(root + "/models/Answer.js");

const errorWrapper = require(root + "/helpers/error/errorWrapper.js");
const CustomError = require(root + "/helpers/error/customError.js");

const checkUserExist = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError(`User Not Found with Id : ${answer_id}`, 404));
  }
  next();
});

const checkQuestionExist = errorWrapper(async (req, res, next) => {
  const question_id = req.params.id || req.params.question_id;

  const question = await Question.findById(question_id);

  if (!question) {
    return next(
      new CustomError(`Question Not Found with Id : ${question_id}`, 404)
    );
  }
  next();
});

const checkQuestionAndAnswerExist = errorWrapper(async (req, res, next) => {
  const { answer_id, question_id } = req.params;

  const answer = await Answer.findOne({
    _id: answer_id,
    question: question_id,
  });

  if (!answer) {
    return next(
      new CustomError(
        `Answer Not Found with Answer Id : ${answer_id} Associated With This Question`,
        404
      )
    );
  }
  next();
});

module.exports = {
  checkUserExist,
  checkQuestionExist,
  checkQuestionAndAnswerExist,
};
