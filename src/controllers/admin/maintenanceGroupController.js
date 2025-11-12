// controllers/admin/maintenanceGroupController.js
const { MaintenanceGroup } = require("../../models");

exports.getMaintenanceGroups = async (req, res) => {
  try {
    const groups = await MaintenanceGroup.findAll({ order: [["id", "ASC"]] });
    res.json(groups);
  } catch (error) {
    console.error("Errore nel recupero gruppi:", error);
    res.status(500).json({ error: "Errore nel recupero gruppi di manutenzione" });
  }
};

exports.addMaintenanceGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "Il nome è obbligatorio" });

    const newGroup = await MaintenanceGroup.create({ name, description });
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Errore creazione gruppo:", error);
    res.status(500).json({ error: "Errore durante la creazione del gruppo" });
  }
};

exports.updateMaintenanceGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await MaintenanceGroup.findByPk(id);
    if (!group) return res.status(404).json({ error: "Gruppo non trovato" });

    await group.update(req.body);
    res.json(group);
  } catch (error) {
    console.error("Errore aggiornamento gruppo:", error);
    res.status(500).json({ error: "Errore durante l'aggiornamento" });
  }
};

exports.deleteMaintenanceGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await MaintenanceGroup.findByPk(id);
    if (!group) return res.status(404).json({ error: "Gruppo non trovato" });

    await group.destroy();
    res.json({ message: "Gruppo eliminato con successo" });
  } catch (error) {
    console.error("Errore eliminazione gruppo:", error);
    res.status(500).json({ error: "Errore durante l'eliminazione" });
  }
};
