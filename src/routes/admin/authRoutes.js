const express = require("express");
const router = express.Router();
const authController = require("../../controllers/admin/authController");

router.post("/login", authController.loginWithEmail);
router.post("/login-pin", authController.loginWithPin);

module.exports = router;