const multer = require('multer');
const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get("/getProfile", profileController.getProfile);
router.get("/getProfileById/:id", profileController.getProfileById);
router.post("/updateProfile", profileController.updateProfile);
router.post("/uploadProfileImage", upload.single("profileImage"), profileController.uploadProfileImage);
router.get("/getRanks", profileController.getRanks);
router.get("/getAPIbackend", profileController.getAPIbackend);
router.get("/getLogs", profileController.getLogs);
router.get("/getUsers/:teamId", profileController.getUsers);
router.put("/:userId/elements", profileController.updateUserElements);

module.exports = router;   
