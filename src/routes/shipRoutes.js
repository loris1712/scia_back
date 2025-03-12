const express = require("express");
const router = express.Router();
const shipController = require("../controllers/shipController");

router.get("/ships", shipController.getAllShips);
router.get("/ships/:id", shipController.getShipById);
router.post("/ships", shipController.createShip);
router.put("/ships/:id", shipController.updateShip);
router.delete("/ships/:id", shipController.deleteShip);

module.exports = router;
