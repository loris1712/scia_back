const { OrganizationCompanyNCAGE } = require("../../models");
require("dotenv").config();

exports.getOrganizations = async (req, res) => {
  try {
    const shipyards = await OrganizationCompanyNCAGE.findAll({
      order: [["Organization_name", "ASC"]],
    });

    return res.json(shipyards);
  } catch (error) {
    console.error("Errore nel recupero cantieri:", error);
    return res.status(500).json({ error: "Errore nel recupero cantieri" });
  }
};

