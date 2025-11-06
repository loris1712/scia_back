const express = require("express");
const router = express.Router();
const maintenanceController = require("../../controllers/admin/maintenanceController");

router.get("/", maintenanceController.getElementModels);

module.exports = router;