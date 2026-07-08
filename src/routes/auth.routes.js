const express = require("express");

const router = express.Router();

const { signup, login, refreshToken, logout } = require("../controllers/auth.controller");

// Signup API
router.post("/signup", signup);

// Login API
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;