const express = require("express");
const User = require("../models/User.js");
const {
    checkUserExist
} = require("../middlewares/database/databaseErrorHelpers.js");

// users,profile
const { getSingleUser, getAllUsers} = require("../controllers/admin.js");
const userQueryMiddleware = require("../middlewares/query/userQueryMiddleware.js");

const router = express.Router();

// Get All Users
router.get("/",userQueryMiddleware(User),getAllUsers);

// Get Single User Profile
router.get("/profile/:id", checkUserExist,getSingleUser);

module.exports = router;
