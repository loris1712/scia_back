const express = require("express");
const router = express.Router();
const failureController = require("../controllers/failuresController");

router.post("/addFailure", failureController.addFailure);
router.get("/getFailures", failureController.getFailures);

module.exports = router;
