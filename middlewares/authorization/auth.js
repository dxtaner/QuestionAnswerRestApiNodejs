const jwt = require("jsonwebtoken");
const errorWrapper = require("../../helpers/error/errorWrapper.js");
const User = require("../../models/User.js");
const Question = require("../../models/Question.js");

const CustomError = require("../../helpers/error/customError.js");

const getAccessToRoute = errorWrapper(async (req, res, next) => {
  // console.log(req.headers.authorization);
  // Is Token Included
  if (!isTokenIncluded(req)) {
    return next(
      new CustomError("You are not authorized to access this page", 403)
    );
  }

  // Get Token From Header
  const accessToken = getAccessTokenFromHeader(req);
  // console.log(accessToken);

  // Control If Token Valid
  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return next(
        new CustomError("You are not authorized to access this page", 401)
      );
    }
    req.user = {
      id: decodedToken.id,
      name: decodedToken.name,
    };
    next();
  });
});

const getAdminAccess = errorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.role !== "admin") {
    return next(new CustomError("Only admins can access this route", 403));
  }
  return next();
});

const getAccessTokenFromHeader = (req) => {
  const authorization = req.headers.authorization;

  const accessToken = authorization.split(" ")[1];
  return accessToken;
};

const isTokenIncluded = (req) => {
  return (
    req.headers.authorization && req.headers.authorization.startsWith("Bearer:")
  );
};

const getQuestionOwnerAccess = errorWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const questionId = req.params.id;

  const question = await Question.findById(questionId);

  if (question.user != userId) {
    return next(new CustomError("Only owner can handle this operation", 403));
  }
  return next();
});

module.exports = {
  getAccessToRoute,
  getAdminAccess,
  getQuestionOwnerAccess,
};
