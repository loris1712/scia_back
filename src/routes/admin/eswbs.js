const express = require("express");
const router = express.Router();
const eswbsController = require("../../controllers/admin/eswbsController");

// Ottieni glossario ESWBS
router.get("/glossary", eswbsController.getESWBSGlossary);

module.exports = router;
