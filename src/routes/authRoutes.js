const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authController = require("../controllers/authController");

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Inserisci un'email valida"),
    body("password").notEmpty().withMessage("La password è obbligatoria"),
  ],
  authController.loginWithEmail
);

router.post(
    "/login-pin",
    [
      body("pin").isLength({ min: 4, max: 4 }).withMessage("Il PIN deve avere 4 cifre"),
    ],
    authController.loginWithPin
  );  

router.post(
  "/set-pin",
  [
    body("email").isEmail().withMessage("Inserisci un'email valida"),
    body("pin").isLength({ min: 4, max: 4 }).withMessage("Il PIN deve avere 4 cifre"),
  ],
  authController.setPin
);

module.exports = router;
