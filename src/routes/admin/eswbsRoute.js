const express = require("express");
const router = express.Router();
const eswbsController = require("../../controllers/admin/eswbsController");

router.get("/glossary", eswbsController.getESWBSGlossary);
router.post("/saveElementModel", eswbsController.saveElementModels);
router.get("/getElementModels", eswbsController.getElementModels);

module.exports = router;
