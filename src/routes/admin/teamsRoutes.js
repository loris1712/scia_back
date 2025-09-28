const express = require("express");
const router = express.Router();
const teamController = require("../../controllers/admin/teamController");

router.get("/getTeams", teamController.getTeams);

module.exports = router;