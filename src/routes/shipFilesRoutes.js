const express = require("express");
const router = express.Router();
const shipFilesController = require("../controllers/shipFilesController");

router.get("/getFiles", shipFilesController.getFiles);

module.exports = router;
