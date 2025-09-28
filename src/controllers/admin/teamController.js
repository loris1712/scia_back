const { Team } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({});

    return res.json(teams);
  } catch (error) {
    console.error("Errore nel recupero utenti:", error);
    return res.status(500).json({ error: "Errore nel recupero utenti" });
  }
}; 