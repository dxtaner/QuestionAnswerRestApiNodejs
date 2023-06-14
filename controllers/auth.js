const User = require("../models/User");
const CustomError = require("../helpers/error/customError.js");
const errorWrapper = require("../helpers/error/errorWrapper.js");
const sendTokenToClient = require("../helpers/authorization/auth.js");
const bcrypt = require("bcryptjs");


const register = errorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenToClient(user, res, 200);

});

const login = errorWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !checkPassword(password, user.password)) {
    return next(new CustomError("Please check your credentials", 404));
  }

  sendTokenToClient(user, res, 200);
});

const getLoggedInUser = errorWrapper(async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

const validateUserInput = (email, password) => email && password;
const matchPassword = (password, confirm) => password === confirm;

const checkPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  register,
  getLoggedInUser,
  login,
};
