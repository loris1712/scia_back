const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

router.get("/type", maintenanceController.getTypes);

router.get("/jobs", maintenanceController.getJobs);

module.exports = router;

