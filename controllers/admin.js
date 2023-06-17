const User = require("../models/User.js");
const errorWrapper = require("../helpers/error/errorWrapper.js");
const CustomError = require("../helpers/error/customError.js");

const getAllUsers = errorWrapper(async (req, res, next) => {
  const user = await User.find();
  return res.status(200).json({
    success: true,
    data: user,
  });
});

const getSingleUser = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  return res.status(200).json({
    success: true,
    data: user,
  });
});

const deleteUser = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  return res.status(200).json({
    success: true,
    message: "User deleted",
  });
});

const getBlockUser = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  await User.updateOne({ _id: user._id }, { blocked: !user.blocked });

  return res.status(200).json({
    success: true,
    message: "User Blocked Successfully",
  });
});

module.exports = {
  getSingleUser,
  getAllUsers,
  deleteUser,
  getBlockUser,
};
