const multer = require('multer');
const express = require("express");
const router = express.Router();
const uploadFilesController = require("../controllers/uploadFilesController");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/uploadPhoto", upload.single("file"), uploadFilesController.uploadPhoto);
router.post("/uploadAudio", upload.single("file"), uploadFilesController.uploadAudio);
router.post("/uploadText", uploadFilesController.uploadTextNote);

module.exports = router;