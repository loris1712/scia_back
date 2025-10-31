const express = require("express");
const router = express.Router();
const shipController = require("../../controllers/admin/shipController");

router.get("/getByModel/:userId/:shipModelId", shipController.getShipsByModel);

module.exports = router;

