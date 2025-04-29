const express = require("express");
const router = express.Router();
const readingsController = require("../controllers/readingsController");

router.get("/getReadings", readingsController.getReadings);
router.get("/getReading", readingsController.getReading);

router.put("/:id", readingsController.updateReading);

module.exports = router;