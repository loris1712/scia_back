const express = require("express");
const router = express.Router();
const recurrencyTypeController = require("../../controllers/admin/recurrencyTypeController");

router.get("/getRecurrencyTypes", recurrencyTypeController.getRecurrencyType);
router.post("/addRecurrencyType", recurrencyTypeController.addRecurrencyType);
router.put("/updateRecurrencyType/:id", recurrencyTypeController.updateRecurrencyType);
router.delete("/deleteRecurrencyType/:id", recurrencyTypeController.deleteRecurrencyType);

module.exports = router;
