const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/getCart", cartController.getCart);
router.get("/getProduct", cartController.getProduct);
router.post("/addProduct", cartController.addProduct);
router.put("/updateProduct/:id", cartController.updateProduct);
router.delete("/removeProduct/:id", cartController.removeProduct);

module.exports = router;