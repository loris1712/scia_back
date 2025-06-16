const multer = require('multer');
const express = require("express");
const router = express.Router();
const spareController = require("../controllers/spareController");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getSpare", spareController.getSpare);
router.get("/getSpares", spareController.getSpares);
router.put("/updateSpare/:id", spareController.updateSpare);
router.put("/moveSpare/:id", spareController.moveSpare);
router.get("/fetchSpareById", spareController.fetchSpareById);
router.post("/submitProduct", spareController.submitProduct);
router.post("/uploadProductImage",upload.single("file"), spareController.uploadProductImage);
router.post("/:maintenanceList_id/spares",upload.single("file"), spareController.addSpareMaintenanceList);

module.exports = router;