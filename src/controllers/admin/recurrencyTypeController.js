const { recurrencyType } = require("../../models");
require("dotenv").config();

exports.getRecurrencyType = async (req, res) => {
  try {
    const recurrencyTypes = await recurrencyType.findAll({
      order: [["id", "ASC"]],
    });

    return res.json(recurrencyTypes);
  } catch (error) {
    console.error("Errore nel recupero delle ricorrenze:", error);
    return res.status(500).json({ error: "Errore nel recupero delle ricorrenze" });
  }
};

exports.addRecurrencyType = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "Il campo 'name' è obbligatorio" });
    }

    const newRecurrencyType = await recurrencyType.create({
      name,
      description,
    });

    return res.status(201).json(newRecurrencyType);
  } catch (error) {
    console.error("Errore nella creazione del tipo di ricorrenza:", error);
    return res.status(500).json({ error: "Errore durante la creazione del tipo di ricorrenza" });
  }
};

exports.updateRecurrencyType = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const existing = await recurrencyType.findByPk(id);
    if (!existing) {
      return res.status(404).json({ error: "Tipo di ricorrenza non trovato" });
    }

    await existing.update(updatedData);

    return res.json(existing);
  } catch (error) {
    console.error("Errore nell'aggiornamento del tipo di ricorrenza:", error);
    return res.status(500).json({ error: "Errore durante l'aggiornamento del tipo di ricorrenza" });
  }
};

exports.deleteRecurrencyType = async (req, res) => {
  try {
    const { id } = req.params;

    const existing = await recurrencyType.findByPk(id);
    if (!existing) {
      return res.status(404).json({ error: "Tipo di ricorrenza non trovato" });
    }

    await existing.destroy();

    return res.json({ message: "Tipo di ricorrenza eliminato con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione del tipo di ricorrenza:", error);
    return res.status(500).json({ error: "Errore durante l'eliminazione del tipo di ricorrenza" });
  }
};
