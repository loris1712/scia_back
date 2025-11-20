const express = require("express");
const router = express.Router();
const filesController = require("../../controllers/admin/filesController");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

router.get("/:shipModelId", filesController.getProjectFiles);

router.post("/:shipId", upload.single("file"), filesController.uploadProjectFile);

router.delete("/:fileId", filesController.deleteFile);

module.exports = router;
 
