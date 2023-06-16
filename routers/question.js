const express = require("express");
const Question = require("../models/Question.js");


const {
    askNewQuestion,
} = require("../controllers/question.js");

const {
    getAccessToRoute,
} = require("../middlewares/authorization/auth.js");


const router = express.Router();


router.post("/ask",getAccessToRoute,askNewQuestion);


module.exports = router;