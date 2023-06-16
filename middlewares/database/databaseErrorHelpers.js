const path = require("path");
const root = path.dirname(require.main.filename);

const User = require(root + "/models/User.js");

const errorWrapper = require(root + "/helpers/error/errorWrapper.js");
const CustomError = require(root + "/helpers/error/customError.js");

const checkUserExist = errorWrapper(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new CustomError(`User Not Found with Id : ${answer_id}`, 404));
  }
  next();
});

module.exports = {
  checkUserExist,
};
