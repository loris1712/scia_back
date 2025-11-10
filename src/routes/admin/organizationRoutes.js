const express = require("express");
const router = express.Router();
const organizationController = require("../../controllers/admin/organizationsController");

router.get("/getOrganizations", organizationController.getOrganizations);

module.exports = router;