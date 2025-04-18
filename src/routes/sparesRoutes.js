const express = require("express");
const router = express.Router();
const spareController = require("../controllers/spareController");

router.get("/getSpare", spareController.getSpare);
router.get("/getSpares", spareController.getSpares);
router.post("/updateSpare/:id", spareController.getSpare);

module.exports = router;