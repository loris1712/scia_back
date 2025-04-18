const express = require("express");
const router = express.Router();
const locationsController = require("../controllers/locationsController");

router.get("/getLocations", locationsController.getLocations);
router.post("/addLocation", locationsController.addLocation);

module.exports = router; 