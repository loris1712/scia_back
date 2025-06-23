const express = require("express");
const router = express.Router();
const elementController = require("../controllers/elementController");

router.post("/addTimeWork", elementController.addElementTimeWork);
router.get("/updateElement/:elementId", elementController.updateElement);

module.exports = router; 
