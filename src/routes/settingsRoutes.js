const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController");

router.get("/getSettings/:user_id", settingsController.getSettings);
router.post("/updateSettings", settingsController.updateSettings);

module.exports = router;