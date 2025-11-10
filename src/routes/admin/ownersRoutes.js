const express = require("express");
const router = express.Router();
const ownerController = require("../../controllers/admin/ownerController");

router.get("/getOwners", ownerController.getOwners);
router.put("/updateOwner/:id", ownerController.updateOwner);
router.post("/createOwner", ownerController.createOwner);

module.exports = router;