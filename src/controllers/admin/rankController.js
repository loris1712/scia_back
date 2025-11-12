const { RanksMarine } = require("../../models");
require("dotenv").config();

exports.addRank = async (req, res) => {
  try {
    const { grado, distintivo_controspallina, codice_nato } = req.body;

    // Validazione minima
    if (!grado || !codice_nato) {
      return res.status(400).json({ error: "Campi obbligatori mancanti (grado, codice_nato)" });
    }

    const newRank = await RanksMarine.create({
      grado,
      distintivo_controspallina,
      codice_nato,
    });

    return res.status(201).json(newRank);
  } catch (error) {
    console.error("Errore nella creazione del grado:", error);
    return res.status(500).json({ error: "Errore durante la creazione del grado" });
  }
};

exports.updateRank = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const rank = await RanksMarine.findByPk(id);

    if (!rank) {
      return res.status(404).json({ error: "Grado non trovato" });
    }

    await rank.update(updatedData);

    return res.json(rank);
  } catch (error) {
    console.error("Errore nell'aggiornamento del grado:", error);
    return res.status(500).json({ error: "Errore durante l'aggiornamento del grado" });
  }
};

exports.deleteRank = async (req, res) => {
  try {
    const { id } = req.params;

    const rank = await RanksMarine.findByPk(id);
    if (!rank) {
      return res.status(404).json({ error: "Grado non trovato" });
    }

    await rank.destroy();

    return res.json({ message: "Grado eliminato con successo" });
  } catch (error) {
    console.error("Errore durante l'eliminazione del grado:", error);
    return res.status(500).json({ error: "Errore durante l'eliminazione del grado" });
  }
};
