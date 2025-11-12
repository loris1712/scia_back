const { Threshold } = require("../../models");
require("dotenv").config();

exports.getThresholds = async (req, res) => {
  try {
    const thresholds = await Threshold.findAll();
    res.json(thresholds);
  } catch (error) {
    console.error("Errore nel recupero soglie:", error);
    res.status(500).json({ error: "Errore nel recupero delle soglie" });
  }
};

exports.addThreshold = async (req, res) => {
  try {
    const { name, description, value, type, active } = req.body;

    if (!name || value === undefined) {
      return res.status(400).json({ error: "Campi obbligatori mancanti (name, value)" });
    }

    const newThreshold = await Threshold.create({
      name,
      description,
      value,
      type,
      active: active ?? true,
    });

    res.status(201).json(newThreshold);
  } catch (error) {
    console.error("Errore nella creazione della soglia:", error);
    res.status(500).json({ error: "Errore durante la creazione della soglia" });
  }
};

exports.updateThreshold = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const threshold = await Threshold.findByPk(id);
    if (!threshold) {
      return res.status(404).json({ error: "Soglia non trovata" });
    }

    await threshold.update(updatedData);
    res.json(threshold);
  } catch (error) {
    console.error("Errore nell'aggiornamento della soglia:", error);
    res.status(500).json({ error: "Errore durante l'aggiornamento" });
  }
};

exports.deleteThreshold = async (req, res) => {
  try {
    const { id } = req.params;

    const threshold = await Threshold.findByPk(id);
    if (!threshold) {
      return res.status(404).json({ error: "Soglia non trovata" });
    }

    await threshold.destroy();
    res.json({ message: "Soglia eliminata con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione della soglia:", error);
    res.status(500).json({ error: "Errore durante l'eliminazione" });
  }
};
