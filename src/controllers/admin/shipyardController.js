const { Shipyards, OrganizationCompanyNCAGE } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getShipyard = async (req, res) => {
  try {
    const shipyards = await Shipyards.findAll({
      include: [
        {
          model: OrganizationCompanyNCAGE,
          as: "organizationCompanyNCAGE",
        },
      ],
      order: [["companyName", "ASC"]],
    });

    return res.json(shipyards);
  } catch (error) {
    console.error("Errore nel recupero cantieri:", error);
    return res.status(500).json({ error: "Errore nel recupero cantieri" });
  }
};

exports.updateShipyard = async (req, res) => {
  try {
    const { id } = req.params;
    const shipyard = await Shipyards.findByPk(id);

    if (!shipyard) {
      return res.status(404).json({ error: "Cantiere non trovato" });
    }

    await shipyard.update(req.body);

    return res.json(shipyard);
  } catch (error) {
    console.error("Errore durante l'aggiornamento del cantiere:", error);
    return res.status(500).json({ error: "Errore durante l'aggiornamento del cantiere" });
  }
};

exports.createShipyards = async (req, res) => {
  try {
    const body = Array.isArray(req.body) ? req.body : [req.body];

    const validData = body.filter(
      (item) =>
        item.companyName &&
        item.address &&
        item.country &&
        item.OrganizationCompanyNCAGE_ID
    );

    if (validData.length === 0) {
      return res
        .status(400)
        .json({ error: "Dati mancanti o non validi per la creazione dei cantieri" });
    }

    const newShipyards = await Shipyards.bulkCreate(validData, { returning: true });

    const createdWithOrg = await Shipyards.findAll({
      where: { ID: newShipyards.map((s) => s.ID) },
      include: [
        {
          model: OrganizationCompanyNCAGE,
          as: "organizationCompanyNCAGE",
        },
      ],
    });

    return res.status(201).json(createdWithOrg);
  } catch (error) {
    console.error("Errore durante la creazione dei cantieri:", error);
    return res
      .status(500)
      .json({ error: "Errore durante la creazione dei cantieri" });
  }
};