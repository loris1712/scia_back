const express = require("express");
const router = express.Router();
const rankController = require("../../controllers/admin/rankController");

router.put("/updateRank/:id", rankController.updateRank);
router.post("/addRank", rankController.addRank);
router.delete("/deleteRank/:id", rankController.deleteRank);

module.exports = router;