const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Ottieni tutti gli utenti
router.get("/", async (req, res) => {
  try {
    const [users] = await db.promise().query("SELECT * FROM users");
    res.json(users);
  } catch (err) {
    console.error("Errore query:", err);
    res.status(500).json({ error: "Errore durante il recupero utenti" });
  } 
}); 

module.exports = router;

