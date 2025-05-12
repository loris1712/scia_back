const { recurrencyType, JobExecution } = require("../models");

exports.getTypes = async (req, res) => {
  try {
    const { ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: "Missing ship_id or user_id" });
    }

    // 1️⃣ Prendi i tipi di manutenzione validi
    const maintenanceTypes = await recurrencyType.findAll({
      where: {
        title: ["Manutenzioni ordinarie", "Manutenzioni straordinarie", "Manutenzioni annuali", "Manutenzioni extra"],
      },
    });

    // 2️⃣ Prendi gli ID dei tipi di manutenzione
    const typeIds = maintenanceTypes.map((type) => type.id);

    // 3️⃣ Filtra i job execution in base ai tipi di manutenzione e ai parametri ship_id & user_id
    const jobExecutions = await JobExecution.findAll({
      where: {
        recurrency_type_id: typeIds,
        ship_id,
        user_id,
      },
      order: [["last_execution", "DESC"]], // Ordina per ultima esecuzione
    });

    // 4️⃣ Formatta i dati per la risposta
    const formattedData = maintenanceTypes.map((type) => {
      const relatedJobs = jobExecutions.filter((job) => job.recurrency_type_id === type.id);
      return {
        id: type.id,
        title: type.title,
        tasks: relatedJobs.length, // Numero di job per quel tipo
        dueDate: relatedJobs.length ? relatedJobs[0].due_date : "N/A",
        lastExecution: relatedJobs.length ? relatedJobs[0].last_execution : "N/A",
      };
    });

    res.status(200).json({ maintenanceTypes: formattedData });

  } catch (error) {
    console.error("Error fetching maintenance types:", error);
    res.status(500).json({ error: "Error fetching maintenance types" });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { type_id, ship_id, user_id } = req.query;

    if (!type_id || !ship_id || !user_id) {
      return res.status(400).json({ error: "Missing type_id, ship_id, or user_id" });
    }

    // 1️⃣ Prendi tutti i job che corrispondono ai parametri
    const jobs = await JobExecution.findAll({
      where: {
        recurrency_type_id: type_id,
        ship_id,
        user_id,
      },
      order: [["due_date", "ASC"]], // Ordina per data di scadenza
    });

    res.status(200).json({ jobs });

  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Error fetching jobs" });
  }
};


