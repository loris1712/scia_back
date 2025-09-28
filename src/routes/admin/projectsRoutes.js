const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/admin/projectController");

router.get("/getProjects", projectController.getProjects);
router.post("/createProject", projectController.createProject);

module.exports = router;