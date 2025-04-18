const express = require("express");
const router = express.Router();
const readingsController = require("../controllers/readingsController");

router.get("/getReadings", readingsController.getReadings);
 
module.exports = router;