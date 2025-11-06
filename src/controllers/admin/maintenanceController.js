const {
  Maintenance_List,
  maintenanceLevel,
  MaintenanceType,
  recurrencyType,
  ElemetModel,
} = require("../../models");

exports.getElementModels = async (req, res) => {
  try {
    const { projectId } = req.query;

    if (!projectId) {
      return res.status(400).json({ error: "Parametro projectId mancante" });
    } 

    const maintenances = await Maintenance_List.findAll({
      where: { id_ship: projectId },
      include: [
        {
          model: maintenanceLevel,
          as: "maintenance_level",
        },
        {
          model: MaintenanceType,
          as: "maintenance_type",
        },
        {
          model: recurrencyType,
          as: "recurrency_type",
        },
        {
          model: ElemetModel,
          as: "element_model",
          attributes: [
            "id",
            "ESWBS_code",
            "LCN_name",
            "LCN",
            "Ship_Area_Room_Code",
            "Deck",
            "Frame",
          ],
        },
      ],
      order: [["id", "ASC"]],
    });

    return res.json(maintenances);
  } catch (error) {
    console.error("❌ Errore nel recupero delle manutenzioni:", error);
    return res
      .status(500)
      .json({ error: "Errore nel recupero delle manutenzioni" });
  }
};
