const express = require("express");
const router = express.Router();
const shipyardController = require("../../controllers/admin/shipyardController");

router.get("/getShipyards", shipyardController.getShipyard);

module.exports = router;