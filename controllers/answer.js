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

const getSingleAnswer = errorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;

  const answer = await Answer.findById(answer_id)
    .populate({ path: "user", select: "name profile_image role " })
    .populate({ path: "question", select: "title createdAt" });

  res.status(200).json({
    success: true,
    data: answer,
  });
});

const editAnswer = errorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;
  const { content } = req.body;

  let answer = await Answer.findById(answer_id);

  answer.content = content;

  console.log(content);
  console.log(answer_id);
  answer = await answer.save();

  res.status(200).json({
    success: true,
    data: answer,
  });
});

const deleteAnswer = errorWrapper(async (req, res, next) => {
  const { question_id, answer_id } = req.params;

  const answer = await Answer.findByIdAndRemove(answer_id);
  // await answer.save();

  const question = await Question.findById(question_id);
  question.answers.splice(question.answers.indexOf(this._id), 1);
  await question.save();

  res.status(200).json({
    success: true,
    message: "Answer Deleted Successfully",
  });
});

const likeAnswer = errorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;

  const answer = await Answer.findById(answer_id);

  if (answer.likes.includes(req.user.id)) {
    return next(new CustomError("You already liked this answer", 400));
  }
  answer.likes.push(req.user.id);
  answer.likeCount += 1;

  await answer.save();

  return res.status(200).json({
    success: true,
    data: answer,
  });
});

const undoLikeAnswer = errorWrapper(async (req, res, next) => {
  const { answer_id } = req.params;

  const answer = await Answer.findById(answer_id);

  if (!answer.likes.includes(req.user.id)) {
    return next(
      new CustomError("You can not undo like operation for this answer", 400)
    );
  }
  const index = answer.likes.indexOf(req.user.id);

  answer.likes.splice(index, 1);
  answer.likeCount -= 1;

  await answer.save();

  res.status(200).json({
    success: false,
    data: answer,
  });
});

module.exports = {
  addNewAnswerToQuestion,
  getAllAnswersByQuestion,
  getSingleAnswer,
  editAnswer,
  deleteAnswer,
  likeAnswer,
  undoLikeAnswer,
};
