const { Location, Warehouses, Spare } = require("../models");

exports.getLocations = async (req, res) => {
  try {
    const { ship_id, user_id } = req.query;

    if (!ship_id || !user_id) {
      return res.status(400).json({ error: "Missing ship_id or user_id" });
    }

    // 1️⃣ Trova tutte le locations con i relativi warehouse
    const locations = await Location.findAll({
      where: { ship_id, user_id },
      include: [
        {
          model: Warehouses,
          as: "warehouseInfo",
          attributes: ["id", "name", "icon_url", "user_id"],
        },
      ],
    });

    // 2️⃣ Trova tutti gli spare per la nave
    const spares = await Spare.findAll({
      where: { ship_id },
      attributes: ["location", "quantity"],
    });

    // 3️⃣ Mappa: locationId -> somma quantità
    const spareCountMap = {};
    spares.forEach((spare) => {
      const locationId = spare.location;
      if (!locationId) return;
      const qty = parseInt(spare.quantity) || 0;
      spareCountMap[locationId] = (spareCountMap[locationId] || 0) + qty;
    });

    // 4️⃣ Enrich locations con il conteggio
    const enrichedLocations = locations.map((loc) => {
      const spareCount = spareCountMap[loc.id] || 0;
      return {
        ...loc.toJSON(),
        spare_count: spareCount,
      };
    });

    res.status(200).json({ locations: enrichedLocations });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ error: "Error fetching locations" });
  }
};

exports.addLocation = async (req, res) => {
  try {
    const { warehouse, ship_id, user_id, location } = req.body;

    if (!warehouse || !ship_id || !user_id || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newLocation = await Location.create({
      warehouse,
      ship_id,
      user_id,
      location,
    });

    res.status(201).json({
      message: "Ubicazione creata con successo",
      location: newLocation,
    });

  } catch (error) {
    console.error("Errore nella creazione dell'ubicazione:", error);
    res.status(500).json({ error: "Errore durante la creazione della nuova ubicazione" });
  }
};
