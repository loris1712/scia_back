const express = require("express");
const router = express.Router();
const maintenanceLevelController = require("../../controllers/admin/maintenanceLevelController");

router.get("/getMaintenanceLevels", maintenanceLevelController.getMaintenanceLevels);
router.put("/updateMaintenanceLevel/:id", maintenanceLevelController.updateMaintenanceLevel);
router.post("/addMaintenanceLevel", maintenanceLevelController.addMaintenanceLevel);
router.delete("/deleteMaintenanceLevel/:id", maintenanceLevelController.deleteMaintenanceLevel);

module.exports = router;