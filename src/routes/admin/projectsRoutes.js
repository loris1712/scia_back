const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/admin/projectController");

router.get("/getProjects", projectController.getProjects);
router.post("/createProject", projectController.createProject);

// 🔥 PRIMA le route fisse
router.post("/startjobs/:ship_id/:project_id", projectController.startJobExecution);
router.get("/:ship_id/runtime", projectController.getProjectRuntime);

// 🔥 DOPO quelle con :id generico
router.get("/getProjectById/:id", projectController.getProjectById);
router.get("/getShipModelsByProject/:id", projectController.getShipModelsByProject);
router.put("/:id", projectController.updateProjectById);
router.post("/:projectId/ship-models", projectController.createShipModel);
router.post("/ships/:modelId", projectController.createShip);

module.exports = router;
