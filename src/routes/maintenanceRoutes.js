const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

router.get("/type", maintenanceController.getTypes);
router.get("/getGeneralTypes", maintenanceController.getGeneralTypes);
router.get("/getMaintenanceLevels", maintenanceController.getMaintenanceLevels);
router.get("/jobs", maintenanceController.getJobs);
router.get("/job", maintenanceController.getJob);
router.post('/updateStatus/:id', maintenanceController.updateStatus);
router.post('/saveStatusComment/:id', maintenanceController.saveStatusComment);
router.patch('/reportAnomaly/:id', maintenanceController.reportAnomaly);
router.patch('/markAsOk/:id', maintenanceController.markAsOk);

module.exports = router;

