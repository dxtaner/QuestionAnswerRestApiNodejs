const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAccessToRoute } = require("../middlewares/authorization/auth.js");
const { addNewAnswerToQuestion,getAllAnswersByQuestion } = require("../controllers/answer.js");

router.post("/", [getAccessToRoute], addNewAnswerToQuestion);

router.get("/", getAllAnswersByQuestion);

module.exports = router;
