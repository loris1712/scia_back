const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

router.get("/type", maintenanceController.getTypes);
router.get("/jobs", maintenanceController.getJobs);
router.get("/job", maintenanceController.getJob);
router.patch('/updateStatus/:id', maintenanceController.updateStatus);
router.patch('/saveStatusComment/:id', maintenanceController.saveStatusComment);
router.patch('/reportAnomaly/:id', maintenanceController.reportAnomaly);
router.patch('/markAsOk/:id', maintenanceController.markAsOk);

module.exports = router;

