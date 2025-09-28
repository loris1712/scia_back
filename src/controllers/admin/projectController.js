const { ProjectCommission } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getProjects = async (req, res) => {
  try {
    const projects = await ProjectCommission.findAll({});

    return res.json(projects);
  } catch (error) {
    console.error("Errore nel recupero utenti:", error);
    return res.status(500).json({ error: "Errore nel recupero utenti" });
  }
}; 

exports.createProject = async (req, res) => {
  try {
    const { name, description, shipyardId, ownerId, date_order, date_delivery } = req.body;

    if (!name || !shipyardId || !ownerId) {
      return res.status(400).json({ error: "Nome, Shipyard e Owner sono obbligatori" });
    }

    const newProject = await ProjectCommission.create({
      name,
      description,
      shipyard_builder_id: shipyardId,
      owner_id: ownerId,
      date_order,
      date_delivery,
    });

    return res.status(201).json(newProject);
  } catch (error) {
    console.error("Errore creando commessa:", error);
    return res.status(500).json({ error: "Errore creando la commessa" });
  }
};