const express = require("express");
const router = express.Router();
const checklistController = require("../controllers/checklistController");

router.get("/getTasks", checklistController.getTasks);
router.get("/getTypes", checklistController.getTypes);

module.exports = router;