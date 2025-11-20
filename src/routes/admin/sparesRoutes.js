const express = require("express");
const router = express.Router();
const sparesController = require("../../controllers/admin/sparesController");

router.get("/", sparesController.getSpares);
router.post("/", sparesController.saveSpare);
router.delete("/:id", sparesController.deleteSpare);

module.exports = router;