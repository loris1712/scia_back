const express = require("express");
const router = express.Router();
const maintenanceController = require("../controllers/maintenanceController");

// Route per ottenere i tipi di manutenzione
router.get("/type", maintenanceController.getTypes);

// Route per ottenere i job di manutenzione (usando query params)
router.get("/jobs", maintenanceController.getJobs);

module.exports = router;

