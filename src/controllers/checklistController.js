const { Task, recurrencyType, Element } = require("../models");

exports.getTasks = async (req, res) => {
  try {
    const { ship_id, userId } = req.query;

    console.log("ship_id:", ship_id, "userId:", userId);

    if (!ship_id || !userId) {
      return res.status(400).json({ error: "Missing ship_id or userId" });
    }

    // 1️⃣ Prendi i tipi di manutenzione validi (recurrency types)
    const maintenanceTypes = await recurrencyType.findAll({
      where: {
        name: [
          "Manutenzioni ordinarie",
          "Manutenzioni straordinarie",
          "Manutenzioni annuali",
          "Manutenzioni extra",
        ],
      },
    });

    const typeIds = maintenanceTypes.map((type) => type.id);

    // 2️⃣ Filtra i task in base ai tipi di manutenzione, ship_id e userId
    const tasks = await Task.findAll({
      where: {
        recurrenceTypeId: typeIds,
        ship_id,
        userId,
      },
      include: [
        {
          model: Element,
          as: "element", // Deve corrispondere all'alias definito sopra!
          attributes: ["id", "name", "element_model_id", "ship_id", "serial_number", "installation_date", "progressive_code"], 
        },
      ],
    });

    // 3️⃣ Formattazione dei dati
    const formattedData = maintenanceTypes.map((type) => {
      const relatedTasks = tasks.filter(
        (task) => task.recurrenceTypeId === type.id
      );

      return {
        id: type.id,
        title: type.name,
        length: relatedTasks.length, // Corretto da "lenght" a "length"
        tasks: relatedTasks.map((task) => ({
          id: task.id,
          element_id: task.element_id,
          element: task.element ? {  // Se l'elemento è presente, aggiungilo
            id: task.element.id,
            element_model_id: task.element.element_model_id,
            name: task.element.name, 
            type: task.element.type,
            location: task.element.location,
          } : null,
          description: task.description,
          start_date: task.start_date,
          end_date: task.end_date,
          assigned_to: task.assigned_to,
          status_id: task.status_id,
          idMaintenanceRoutine: task.idMaintenanceRoutine,
          levelId: task.levelId,
          recurrenceTypeId: task.recurrenceTypeId,
          userId: task.userId,
          denomination: task.denomination,
          recurrenceDays: task.recurrenceDays,
          earlyThreshold: task.earlyThreshold,
          delayThreshold: task.delayThreshold,
          shortDescription: task.shortDescription,
          extendedDescriptionHTML: task.extendedDescriptionHTML,
          pdfAttachment: task.pdfAttachment,
          video: task.video,
          ship_id: task.ship_id,
        })),
      };
    });

    res.status(200).json({ tasks: formattedData });

  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

exports.getTypes = async (req, res) => {
  try {

    const maintenanceTypes = await recurrencyType.findAll({
      where: {
        name: ["Manutenzioni ordinarie", "Manutenzioni straordinarie", "Manutenzioni annuali", "Manutenzioni extra"],
      },
    });

    const typeIds = maintenanceTypes.map((type) => type.id);

    res.status(200).json({ types: typeIds });

  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};


