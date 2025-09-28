const { Shipyards } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getShipyard = async (req, res) => {
  try {
    const users = await Shipyards.findAll({});

    return res.json(users);
  } catch (error) {
    console.error("Errore nel recupero utenti:", error);
    return res.status(500).json({ error: "Errore nel recupero utenti" });
  }
}; 