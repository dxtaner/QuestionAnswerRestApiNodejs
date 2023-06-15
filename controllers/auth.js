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

const logout = errorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;

  // Send To Client With Res
  return res
    .status(200)
    .cookie("token", null, {
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout Successfull",
    });
});

const validateUserInput = (email, password) => email && password;
const matchPassword = (password, confirm) => password === confirm;

const checkPassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

const imageUpload = errorWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    success: true,
    data:user,
    message: "Photo Upload Successful",
  });
});

module.exports = {
  register,
  getLoggedInUser,
  login,
  logout,
  imageUpload,
};
