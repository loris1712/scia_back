const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/admin/projectController");

// 🔹 Ottieni tutte le commesse
router.get("/getProjects", projectController.getProjects);

// 🔹 Crea una nuova commessa
router.post("/createProject", projectController.createProject);

// 🔹 Ottieni una singola commessa per ID
router.get("/getProjectById/:id", projectController.getProjectById);

// 🔹 Ottieni tutti i modelli nave associati alla commessa
router.get("/getShipModelsByProject/:id", projectController.getShipModelsByProject);

router.put("/:id", projectController.updateProjectById);

module.exports = router;
