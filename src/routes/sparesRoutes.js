const express = require("express");
const router = express.Router();
const spareController = require("../controllers/spareController");

router.get("/getSpare", spareController.getSpare);
router.get("/getSpares", spareController.getSpares);
router.put("/updateSpare/:id", spareController.updateSpare);
router.put("/moveSpare/:id", spareController.moveSpare);
router.get("/fetchSpareById", spareController.fetchSpareById);

module.exports = router;