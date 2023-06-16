const express = require("express");
const User = require("../models/User");
const {
    checkUserExist
} = require("../middlewares/database/databaseErrorHelpers.js");

// users,profile
const { getSingleUser, getAllUsers} = require("../controllers/admin.js");

const router = express.Router();

// Get All Users
router.get("/",getAllUsers);

// Get Single User Profile
router.get("/profile/:id", checkUserExist,getSingleUser);

module.exports = router;
