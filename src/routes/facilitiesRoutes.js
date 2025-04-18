const express = require("express");
const router = express.Router();
const facilitiesController = require("../controllers/facilitiesController");

router.get("/getFacilities", facilitiesController.getFacilities);
 
module.exports = router;