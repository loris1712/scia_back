const express = require("express");
const router = express.Router();
const scansController = require("../controllers/scansController");

router.get("/getScans", scansController.getScans);
router.put("/saveScan/:scanId", scansController.saveScan);

module.exports = router;