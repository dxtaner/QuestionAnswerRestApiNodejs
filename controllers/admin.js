const User = require("../models/User.js");
const errorWrapper = require("../helpers/error/errorWrapper.js");

const getAllUsers = errorWrapper(async (req, res, next) => {
  return res.status(200).json(res.advanceQueryResults);
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

  const message = !user.blocked
    ? `User: ${user.name} Blocked Successfully`
    : `User: ${user.name} Unblocked Successfully`;

  return res.status(200).json({
    success: true,
    message: message,
  });
});

module.exports = {
  getSingleUser,
  getAllUsers,
  deleteUser,
  getBlockUser,
};
