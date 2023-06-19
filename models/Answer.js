const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Question = require("./Question.js");

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, "Please provide a content"],
    minlength: [20, "Please provide content at least 20 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0,
    min: 0,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  question: {
    type: mongoose.Schema.ObjectId,
    ref: "Question",
    required: true,
  },
});

AnswerSchema.pre("save", async function (next) {
  if (!this.isModified("user")) return next();

  try {
    const question = await Question.findById(this.question);

    question.answers.push(this.id);
    question.answerCount += 1;

    await question.save();
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Answer", AnswerSchema);
