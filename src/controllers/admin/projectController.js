const { ProjectCommission, Ship, Shipyards, shipModel } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 🔹 1️⃣ Ottieni tutte le commesse
exports.getProjects = async (req, res) => {
  try {
    const projects = await ProjectCommission.findAll({});
    return res.json(projects);
  } catch (error) {
    console.error("Errore nel recupero commesse:", error);
    return res.status(500).json({ error: "Errore nel recupero commesse" });
  }
};

// 🔹 2️⃣ Crea una nuova commessa
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

exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectCommission.findByPk(id, {
      include: [
        {
          model: Shipyards,
          as: "shipyard",
        },
        {
          model: Ship,
          as: "ships",
        },
      ],
    });

    if (!project) {
      return res.status(404).json({ error: "Commessa non trovata" });
    }

    return res.json(project);
  } catch (error) {
    console.error("Errore nel recupero commessa:", error);
    return res.status(500).json({ error: "Errore nel recupero commessa" });
  }
};

exports.getShipModelsByProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Esempio: trova i modelli nave collegati a quella commessa
    const shipModels = await shipModel.findAll({
      where: { commission_id: id },
    });

    if (!shipModels || shipModels.length === 0) {
      return res.json([]); // nessun modello trovato
    }

    return res.json(shipModels);
  } catch (error) {
    console.error("Errore nel recupero modelli nave:", error);
    return res.status(500).json({ error: "Errore nel recupero modelli nave" });
  }
};

exports.updateProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      date_order,
      date_delivery,
      owner_id,
      shipyard_builder_id,
    } = req.body;

    // 🔍 Trova la commessa
    const project = await ProjectCommission.findByPk(id);

    if (!project) {
      return res.status(404).json({ error: "Commessa non trovata" });
    }

    // 🔄 Aggiorna i campi modificabili
    project.name = name ?? project.name;
    project.description = description ?? project.description;
    project.date_order = date_order ?? project.date_order;
    project.date_delivery = date_delivery ?? project.date_delivery;
    project.owner_id = owner_id ?? project.owner_id;
    project.shipyard_builder_id =
      shipyard_builder_id ?? project.shipyard_builder_id;

    await project.save();

    return res.json({
      message: "Commessa aggiornata con successo",
      project,
    });
  } catch (error) {
    console.error("Errore durante l'aggiornamento della commessa:", error);
    return res
      .status(500)
      .json({ error: "Errore durante l'aggiornamento della commessa" });
  }
};