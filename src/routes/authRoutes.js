const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.loginWithEmail);
router.post("/login-pin", authController.loginWithPin);
router.post("/set-pin", authController.setPin);
router.post("/logout", authController.logout);

router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/getSecuritySettings", authController.getUserSecuritySettings);
router.post("/updateSecuritySettings", authController.updateUserSecuritySettings);

module.exports = router;
