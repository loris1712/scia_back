const { maintenanceLevel } = require("../../models");
require("dotenv").config();

exports.getMaintenanceLevels = async (req, res) => {
  try {
    const maintenanceLevels = await maintenanceLevel.findAll();

    return res.json(maintenanceLevels);
  } catch (error) {
    console.error("Errore nel recupero cantieri:", error);
    return res.status(500).json({ error: "Errore nel recupero cantieri" });
  }
};

exports.updateMaintenanceLevel = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // cerca il livello per ID
    const level = await maintenanceLevel.findByPk(id);

    if (!level) {
      return res.status(404).json({ error: "Livello non trovato" });
    }

    // aggiorna i campi
    await level.update(updatedData);

    return res.json(level); // restituisce il record aggiornato
  } catch (error) {
    console.error("Errore nell'aggiornamento del livello:", error);
    return res.status(500).json({ error: "Errore durante l'aggiornamento del livello" });
  }
};

exports.addMaintenanceLevel = async (req, res) => {
  try {
    const { Level_MIL_STD_1388, Level_MMI, Industry_Level, Description } = req.body;

    if (!Level_MIL_STD_1388 || !Level_MMI) {
      return res.status(400).json({ error: "Campi obbligatori mancanti" });
    }

    const newLevel = await maintenanceLevel.create({
      Level_MIL_STD_1388,
      Level_MMI,
      Industry_Level,
      Description,
    });

    return res.status(201).json(newLevel);
  } catch (error) {
    console.error("Errore nella creazione del livello:", error);
    return res.status(500).json({ error: "Errore durante la creazione del livello" });
  }
};

exports.deleteMaintenanceLevel = async (req, res) => {
  try {
    const { id } = req.params;

    const level = await maintenanceLevel.findByPk(id);
    if (!level) {
      return res.status(404).json({ error: "Livello non trovato" });
    }

    await level.destroy();
    return res.json({ message: "Livello eliminato con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione del livello:", error);
    return res.status(500).json({ error: "Errore durante l'eliminazione del livello" });
  }
};


