const express = require("express");
const router = express.Router();
const maintenanceGroupController = require("../../controllers/admin/maintenanceGroupController");

router.get("/getMaintenanceGroups", maintenanceGroupController.getMaintenanceGroups);
router.put("/updateMaintenanceGroup/:id", maintenanceGroupController.updateMaintenanceGroup);
router.post("/addMaintenanceGroup", maintenanceGroupController.addMaintenanceGroup);
router.delete("/deleteMaintenanceGroup/:id", maintenanceGroupController.deleteMaintenanceGroup);

module.exports = router;