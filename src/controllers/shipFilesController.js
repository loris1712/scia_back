const { ShipFiles } = require('../models');

exports.getFiles = async (req, res) => {
  try {
    const { ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: 'Il parametro ship_id è obbligatorio.' });
    }

    const files = await ShipFiles.findAll({
      where: {
        ship_id,
        user_id,
      },
      order: [['uploaded_at', 'DESC']],
    });

    res.status(200).json({ files });
  } catch (error) {
    console.error('Errore nel recupero dei file:', error);
    res.status(500).json({ error: 'Errore nel recupero dei file.' });
  }
};



