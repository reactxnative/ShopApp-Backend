const express = require("express");

const router = express.Router();

const { getProfile,updateProfile } = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");
// Get User Profile
router.get("/profile", authMiddleware, getProfile);

// Update User Profile
router.put("/update-profile", authMiddleware, updateProfile);

module.exports = router;