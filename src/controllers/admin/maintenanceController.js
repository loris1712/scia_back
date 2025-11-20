const {
  Maintenance_List,
  maintenanceLevel,
  MaintenanceType,
  recurrencyType,
  ElemetModel,
} = require("../../models");

exports.getMaintenancess = async (req, res) => {
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

exports.createMaintenance = async (req, res) => {
  try {
    const { 
      id_ship, 
      maintenance_level_id,
      maintenance_type_id,
      recurrency_type_id,
      System_ElementModel_ID,
      title,
      description,
      hours,
      frequency 
    } = req.body;

    if (!id_ship || !title) {
      return res.status(400).json({
        error: "Campi obbligatori mancanti: id_ship, maintenance_level_id, maintenance_type_id, title"
      });
    }

    const newMaintenance = await Maintenance_List.create({
      id_ship,
      maintenance_level_id,
      maintenance_type_id,
      recurrency_type_id,
      System_ElementModel_ID,
      name: title,
      description: description || null,
      hours: hours || null,
      frequency: frequency || null
    });

    return res.status(201).json({
      success: true,
      message: "Manutenzione creata con successo",
      maintenance: newMaintenance
    });

  } catch (error) {
    console.error("❌ Errore creando manutenzione:", error);
    return res.status(500).json({
      error: "Errore durante la creazione della manutenzione"
    });
  }
};

exports.deleteMaintenance = async (req, res) => {
  try {
    const { id } = req.params;

    const maintenance = await Maintenance_List.findByPk(id);
    if (!maintenance) return res.status(404).json({ error: "Ricambio non trovato" });

    await maintenance.destroy();

    return res.json({ success: true });
  } catch (error) {
    console.error("❌ Errore eliminazione ricambio:", error);
    return res.status(500).json({ error: "Errore eliminazione ricambio" });
  }
};

