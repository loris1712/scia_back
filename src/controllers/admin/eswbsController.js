const { ESWBS_Glossary } = require("../../models");
const { ElemetModel } = require("../../models");

exports.getESWBSGlossary = async (req, res) => {
  try {
    const glossary = await ESWBS_Glossary.findAll({
      attributes: ["id", "eswbs_glossary_code", "short_description_ita", "name_navsea_S9040IDX"],
      order: [["eswbs_glossary_code", "ASC"]],
      limit: 1000, // opzionale: limitiamo per evitare carichi enormi
    });

    return res.json(glossary);
  } catch (error) {
    console.error("Errore nel recupero del glossario ESWBS:", error);
    return res.status(500).json({ error: "Errore nel recupero del glossario ESWBS" });
  }
};

exports.saveElementModels = async (req, res) => {
  try {
    const data = req.body;

    if (!data || data.length === 0) {
      return res.status(400).json({ error: "Nessun dato ricevuto" });
    }

    if (Array.isArray(data)) {
      await ElemetModel.bulkCreate(data);
    } else {
      await ElemetModel.create(data);
    }

    return res.json({ success: true, message: "Elementi salvati correttamente" });
  } catch (error) {
    console.error("❌ Errore nel salvataggio di ElementModel:", error);
    return res.status(500).json({ error: "Errore nel salvataggio di ElementModel" });
  }
};

exports.getElementModels = async (req, res) => {
  try {
    const { ship_model_id } = req.query;

    const elements = await ElemetModel.findAll({
      where: { ship_model_id },
      attributes: [
        "id",
        "ESWBS_code",
        "LCN_name",
        "eswbs_glossary_id"
      ],
      order: [["ESWBS_code", "ASC"]],
    });

    return res.json(elements);
  } catch (error) {
    console.error("Errore nel recupero degli ElementModel:", error);
    return res.status(500).json({ error: "Errore nel recupero degli ElementModel" });
  }
};