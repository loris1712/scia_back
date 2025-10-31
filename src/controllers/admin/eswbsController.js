const { ESWBS_Glossary } = require("../../models");

// 🔹 Ottieni il glossario ESWBS (solo info principali)
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
