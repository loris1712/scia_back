const express = require("express");
const router = express.Router();
const thresholdController = require("../../controllers/admin/thresholdController");

// 🔹 GET — Recupera tutte le soglie
router.get("/getThresholds", thresholdController.getThresholds);

// 🔹 POST — Aggiunge una nuova soglia
router.post("/addThreshold", thresholdController.addThreshold);

// 🔹 PUT — Aggiorna una soglia esistente
router.put("/updateThreshold/:id", thresholdController.updateThreshold);

// 🔹 DELETE — Elimina una soglia
router.delete("/deleteThreshold/:id", thresholdController.deleteThreshold);

module.exports = router;
