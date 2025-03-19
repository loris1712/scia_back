const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/getProfile", profileController.getProfile);
router.post("/updateProfile", profileController.updateProfile);

module.exports = router; 
