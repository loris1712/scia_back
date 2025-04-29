const { Scans, Element, Ship } = require("../models");

exports.getScans = async (req, res) => {
  try {
    const { ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: "I parametri ship_id e user_id sono obbligatori." });
    }

    const scans = await Scans.findAll({
      where: {
        ship_id,
        user_id,
      },
      include: [
        {
          model: Element,
          as: 'element', // occhio: solo se hai definito l'alias! (se vuoi ti aiuto a sistemarlo)
          attributes: ["id", "name", "element_model_id", "ship_id", "serial_number", "installation_date", "progressive_code"],
        },
        {
          model: Ship,
          as: 'ship', // idem
          attributes: ["id", "unit_name"], // solo se vuoi anche nome della nave
        },
      ],
    });

    res.status(200).json(scans);
  } catch (error) {
    console.error("Errore nel recupero delle scans:", error);
    res.status(500).json({ error: "Errore nel recupero delle scans" });
  }
};

exports.saveScan = async (req, res) => {
  try {
    const { scanId, scannedData, scannedAt } = req.body;

    if (!scanId || !scannedData || !scannedAt) {
      return res.status(400).json({ error: "Parametri mancanti: scanId, scannedData e scannedAt sono obbligatori." });
    }

    const scan = await Scans.findByPk(scanId);

    if (!scan) {
      return res.status(404).json({ error: "Scan non trovato." });
    }

    scan.result = scannedData;
    scan.scanned_at = scannedAt;

    await scan.save();

    res.status(200).json({ message: "Scan aggiornato correttamente.", scan });
  } catch (error) {
    console.error("Errore nel salvataggio dello scan:", error);
    res.status(500).json({ error: "Errore nel salvataggio dello scan." });
  }
};

