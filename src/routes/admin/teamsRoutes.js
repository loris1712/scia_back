const express = require("express");
const router = express.Router();
const teamController = require("../../controllers/admin/teamController");

router.get("/getTeams", teamController.getTeams);
router.put("/updateTeam/:id", teamController.updateTeam);
router.get("/getTeamMembers/:id", teamController.getTeamMembers);
router.put("/updateTeamMembers/:id", teamController.updateTeamMembers);

module.exports = router;