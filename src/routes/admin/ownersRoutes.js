const express = require("express");
const router = express.Router();
const ownerController = require("../../controllers/admin/ownerController");

router.get("/getOwners", ownerController.getOwners);

module.exports = router;