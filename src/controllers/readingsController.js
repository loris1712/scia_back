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
