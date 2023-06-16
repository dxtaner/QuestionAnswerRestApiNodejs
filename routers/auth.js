const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  imageUpload,
  forgotPassword,
  getLoggedInUser,
  resetPassword,
  updateDetails,
} = require("../controllers/auth.js");
const photoUpload = require("../helpers/libraries/multer.js");
const { getAccessToRoute }= require("../middlewares/authorization/auth.js");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", getAccessToRoute, logout);

router.get("/user",getAccessToRoute,getLoggedInUser);
router.put(
  "/upload",
  [getAccessToRoute, photoUpload.single("profile_image")],
  imageUpload
);

router.put("/edit",getAccessToRoute,updateDetails);
router.post("/forgotpassword",forgotPassword);
router.put("/resetpassword",resetPassword);

module.exports = router;