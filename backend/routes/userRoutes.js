const express = require("express");
const router = express.Router();
const { getUser, deleteUser } = require("../controllers/userControllers");
const { verifyAccessToken } = require("../index.js");

// Routes beginning with /api/profile
router.get("/", verifyAccessToken, getUser);
router.delete("/deleteUser",verifyAccessToken, deleteUser )

module.exports = router;