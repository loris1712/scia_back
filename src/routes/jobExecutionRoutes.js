const express = require("express");
const router = express.Router();
const jobExecutionController = require("../controllers/jobExecutionController");

router.get("/execution/ship/:shipId", jobExecutionController.getExecutionsByShip);
router.get("/execution/:executionId", jobExecutionController.getExecutionById); 
router.post("/execution", jobExecutionController.createExecution);
router.put("/execution/:executionId", jobExecutionController.updateExecution);
router.delete("/execution/:executionId", jobExecutionController.deleteExecution);

module.exports = router;
