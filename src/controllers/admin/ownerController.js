const { Owner, OrganizationCompanyNCAGE } = require("../../models");
require("dotenv").config();

// 🔹 GET - Ottiene tutti gli owners
exports.getOwners = async (req, res) => {
  try {
    const owners = await Owner.findAll({
      include: [
        {
          model: OrganizationCompanyNCAGE,
          as: "organizationCompany",
        },
      ],
      order: [["companyName", "ASC"]],
    });

    return res.json(owners);
  } catch (error) {
    console.error("Errore nel recupero owners:", error);
    return res.status(500).json({ error: "Errore nel recupero owners" });
  }
};

// 🔹 POST - Crea un nuovo owner
exports.createOwner = async (req, res) => {
  try {
    // Accetta sia singolo oggetto che array
    const body = Array.isArray(req.body) ? req.body : [req.body];

    // 🔹 Normalizza i dati: tieni solo OrganizationCompanyNCAGE_ID (numerico)
    const cleanData = body.map((item) => ({
      companyName: item.companyName,
      Organisation_name: item.Organisation_name || null,
      address: item.address || null,
      country: item.country || null,
      armedForces: item.armedForces || null,
      OrganizationCompanyNCAGE_ID: item.OrganizationCompanyNCAGE_ID
        ? parseInt(item.OrganizationCompanyNCAGE_ID)
        : null,
    }));

    // 🔹 Crea tutti i record
    const newOwners = await Owner.bulkCreate(cleanData, { returning: true });

    // 🔹 Recupera i record creati con l’associazione OrganizationCompanyNCAGE
    const createdWithOrg = await Owner.findAll({
      where: { ID: newOwners.map((o) => o.ID) },
      include: [
        {
          model: OrganizationCompanyNCAGE,
          as: "organizationCompany",
        },
      ],
    });

    return res.status(201).json(createdWithOrg);
  } catch (error) {
    console.error("Errore durante la creazione degli owner:", error);
    return res
      .status(500)
      .json({ error: "Errore durante la creazione degli owner" });
  }
};


// 🔹 PUT - Aggiorna un owner esistente
exports.updateOwner = async (req, res) => {
  try {
    const { id } = req.params;
    const owner = await Owner.findByPk(id);

    if (!owner) {
      return res.status(404).json({ error: "Owner non trovato" });
    }

    await owner.update(req.body);

    const updated = await Owner.findByPk(id, {
      include: [
        {
          model: OrganizationCompanyNCAGE,
          as: "organizationCompany",
        },
      ],
    });

    return res.json(updated);
  } catch (error) {
    console.error("Errore durante l'aggiornamento dell'owner:", error);
    return res
      .status(500)
      .json({ error: "Errore durante l'aggiornamento dell'owner" });
  }
};
