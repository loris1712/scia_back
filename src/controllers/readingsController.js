const { Readings, ReadingsType, Element } = require("../models");

exports.getReadings = async (req, res) => {
  try {
    const { ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: "I parametri ship_id e user_id sono obbligatori." });
    }

    const readings = await Readings.findAll({
      where: {
        ship_id,
        user_id,
      },
      include: [
        {
          model: ReadingsType,
          as: 'type',
        },
        {
          model: Element,
          as: 'element',
          attributes: ["id", "name", "element_model_id", "ship_id", "serial_number", "installation_date", "progressive_code"], 
        },
      ],
    });
    
    res.status(200).json(readings);
  } catch (error) {
    console.error("Errore nel recupero delle letture:", error);
    res.status(500).json({ error: "Errore nel recupero delle letture" });
  }
};

exports.getReading = async (req, res) => {
  try {
    const { id, user_id } = req.query;

    if (!id || !user_id) {
      return res.status(400).json({ error: "I parametri ship_id e user_id sono obbligatori." });
    }

    const readings = await Readings.findAll({
      where: {
        id,
        user_id,
      },
      include: [
        {
          model: ReadingsType,
          as: 'type',
        },
        {
          model: Element,
          as: 'element',
          attributes: ["id", "name", "element_model_id", "ship_id", "serial_number", "installation_date", "progressive_code"], 
        },
      ],
    });
    
    res.status(200).json(readings);
  } catch (error) {
    console.error("Errore nel recupero delle letture:", error);
    res.status(500).json({ error: "Errore nel recupero delle letture" });
  }
};

exports.updateReading = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    if (!id) {
      return res.status(400).json({ error: "Parametro 'id' mancante." });
    }

    const [updated] = await Readings.update(updatedData, {
      where: { id }
    });

    if (updated === 0) {
      return res.status(404).json({ error: "Lettura non trovata o nessuna modifica effettuata." });
    }

    const updatedReading = await Readings.findOne({
      where: { id }
    });

    res.status(200).json(updatedReading);
  } catch (error) {
    console.error("Errore nell'aggiornamento della lettura:", error);
    res.status(500).json({ error: "Errore nell'aggiornamento della lettura." });
  }
};

