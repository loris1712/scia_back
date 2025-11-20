const { Spare } = require("../../models");

exports.getSpares = async (req, res) => {
  try {
    const { shipModelId } = req.query;

    if (!shipModelId) {
      return res.status(400).json({ error: "Parametro shipModelId mancante" });
    }

    const spares = await Spare.findAll({
      where: { ship_id: shipModelId },
      order: [["ID", "ASC"]],
    });

    return res.json(spares);
  } catch (error) {
    console.error("❌ Errore nel recupero dei ricambi:", error);
    return res.status(500).json({ error: "Errore nel recupero dei ricambi" });
  }
};



// 🔹 CREATE or UPDATE Spare
exports.saveSpare = async (req, res) => {
  try {
    const data = req.body;

    if (!data.Serial_number || !data.ship_id) {
      return res.status(400).json({ error: "Serial Number e ship_id sono obbligatori" });
    }

    let spare;

    // 🔄 Se esiste ID → update
    if (data.ID) {
      spare = await Spare.findByPk(data.ID);

      if (!spare) {
        return res.status(404).json({ error: "Ricambio non trovato" });
      }

      await spare.update(data);
    } 
    // ➕ Altrimenti create nuovo
    else {
      spare = await Spare.create(data);
    }

    return res.status(201).json(spare);

  } catch (error) {
    console.error("❌ Errore salvataggio ricambio:", error);
    return res.status(500).json({ error: "Errore salvataggio ricambio" });
  }
};

exports.deleteSpare = async (req, res) => {
  try {
    const { id } = req.params;

    const spare = await Spare.findByPk(id);
    if (!spare) return res.status(404).json({ error: "Ricambio non trovato" });

    await spare.destroy();

    return res.json({ success: true });
  } catch (error) {
    console.error("❌ Errore eliminazione ricambio:", error);
    return res.status(500).json({ error: "Errore eliminazione ricambio" });
  }
};

