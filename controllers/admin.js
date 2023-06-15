const User = require("../models/User.js");
const errorWrapper = require("../helpers/error/errorWrapper.js");
const CustomError = require("../helpers/error/customError.js");

const getAllUsers = errorWrapper(async (req, res, next) => {
  const user = await User.find();
  return res.status(200).json({
    success:true,
    data:user,
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

module.exports = {
  getSingleUser,
  getAllUsers
};