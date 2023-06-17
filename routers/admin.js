const express = require("express");

const {
  getAccessToRoute,
  getAdminAccess,
} = require("../middlewares/authorization/auth.js");
const { deleteUser, getBlockUser } = require("../controllers/admin.js");

const {
  checkUserExist,
} = require("../middlewares/database/databaseErrorHelpers.js");

const router = express.Router();

// users, user, delete, block

router.use([getAccessToRoute, getAdminAccess]);

router.get("/block/:id", checkUserExist, getBlockUser);
router.delete("/user/:id", checkUserExist, deleteUser);

module.exports = router;
