const express = require("express");
const router = express.Router();
const maintenanceController = require("../../controllers/admin/maintenanceController");

router.get("/", maintenanceController.getMaintenancess);
router.post("/", maintenanceController.createMaintenance);
router.delete("/:id", maintenanceController.deleteMaintenance);

module.exports = router;