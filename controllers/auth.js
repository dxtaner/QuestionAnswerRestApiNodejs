const User = require("../models/User.js");
const CustomError = require("../helpers/error/customError.js");
const errorWrapper = require("../helpers/error/errorWrapper.js");
// const sendTokenToClient = require("../helpers/authorization/auth.js");
const bcrypt = require("bcryptjs");
const sendMail = require("../helpers/libraries/sendEmail.js");

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
    .cookie("access_token", null, {
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
    data: user,
    message: "Photo Upload Successful",
  });
});

const forgotPassword = errorWrapper(async (req, res, next) => {
  const resetEmail = req.body.email;
  const user = await User.findOne({ email: resetEmail });

  if (!user) {
    return next(new CustomError("User Not Found With That Email", 400));
  }
  const resetPasswordToken = user.getResetPasswordToken();

  await user.save();

  const resetPasswordUrl = `http://localhost:5000/api/v1/auth/resetPassword?resetPasswordToken=${resetPasswordToken}`;

  const emailTemplate = `
      <h3>Reset Your Password</h3>
      <p>This <a href = '${resetPasswordUrl}' target = '_blank'>link</a>  will expire in 1 hour</p>
  `;
  try {
    await sendMail({
      from: process.env.SMTP_EMAIL,
      to: resetEmail,
      subject: "Reset Password Token",
      html: emailTemplate,
    });
    return res.status(200).json({
      success: true,
      message: "Email Sent",
      data: user,
    });
  } catch (err) {
    user.resetPasswordToken = null;
    user.resetPasswordExpire = null;

    user.save();

    return next(new CustomError("Email Could Not Be Sent", 500));
  }
});

const resetPassword = errorWrapper(async (req, res, next) => {
  const { resetPasswordToken } = req.query;
  const { password } = req.body;

  if (!resetPasswordToken) {
    return next(new CustomError("Please provide a valid token", 400));
  }
  let user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new CustomError("Invalid Token or Session Expired", 404));
  }
  user.password = password;
  user.resetPasswordToken = null;
  user.resetPasswordExpire = null;

  user = await user.save();

  sendTokenToClient(user, res, 200);
});

const updateDetails = errorWrapper(async (req, res, next) => {
  const updateDetails = req.body;

  const user = await User.findByIdAndUpdate(req.user.id, updateDetails, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Details Updated",
    data: user,
  });
});

const sendTokenToClient = (user, res, status) => {
  // Get Token From User Model
  const token = user.getTokenFromUserModel();

  const { JWT_COOKIE_EXPIRE, NODE_ENV } = process.env;

  // console.log(token)
  // Send To Client With Res
  return res
    .status(status)
    .cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRE) * 1000 * 60),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      access_token: token,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile_image,
      },
    });
};

module.exports = {
  register,
  getLoggedInUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
  resetPassword,
  updateDetails,
};
