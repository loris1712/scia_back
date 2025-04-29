const { Spare, Location, Warehouses } = require("../models");

exports.getSpare = async (req, res) => {
  try {
    const { name, serial_number } = req.query;

    const where = {};
    if (name) where.name = name;
    if (serial_number) where.serial_number = serial_number;
    const spares = await Spare.findAll({ where, include: [
      {
        model: Warehouses,
        as: "warehouseData",
        attributes: ["id", "name", "icon_url"]
      },
      {
        model: Location,
        as: "locationData",
        attributes: ["id", "location", "ship_id"]
      }
    ] });

    res.status(200).json({ spares });

  } catch (error) {
    console.error("Error fetching spares:", error);
    res.status(500).json({ error: "Error fetching spares" });
  }
};

exports.getSpares = async (req, res) => {
  try {
    const { ship_id } = req.query;

    const where = {};
    if (ship_id) where.ship_id = ship_id;

    const spares = await Spare.findAll({
      where,
      include: [
        {
          model: Warehouses,
          as: "warehouseData",
          attributes: ["id", "name", "icon_url"]
        },
        {
          model: Location,
          as: "locationData",
          attributes: ["id", "location", "ship_id"]
        }
      ]
    });

    res.status(200).json({ spares });
  } catch (error) {
    console.error("Error fetching spares:", error);
    res.status(500).json({ error: "Error fetching spares" });
  }
};

exports.updateSpare = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      quantity,
      location_onboard,
      location_dock,
      location_basin,
      eswbs,
      system_description
    } = req.body;

    const [updated] = await Spare.update(
      {
        quantity,
        location_onboard,
        location_dock,
        location_basin,
        eswbs,
        system_description
      },
      {
        where: { id }
      }
    );

    if (updated) {
      res.status(200).json({ message: "Spare updated successfully", updated_id: id });
    } else {
      res.status(404).json({ message: "Spare not found" });
    }

  } catch (error) {
    console.error("Error updating spare:", error);
    res.status(500).json({ error: "Error updating spare" });
  }
};

exports.moveSpare = async (req, res) => {
  try {
    const { id } = req.params;
    const { updateData, ship_id, user_id } = req.body;

    if (!updateData || !ship_id || !user_id) {
      return res.status(400).json({ message: "updateData, ship_id, and user_id are required" });
    }

    const newLocation = updateData.locationData[0].newLocation;
    console.log(newLocation)

    let locationRecord = await Location.findOne({
      where: {
        location: newLocation,
        ship_id: ship_id,
        user_id: user_id
      }
    });

    if (!locationRecord) {
      locationRecord = await Location.create({
        warehouse: 1,
        location: newLocation,
        ship_id: ship_id,
        user_id: user_id
      });
    }

    const newLocationId = locationRecord.id;

    const [updated] = await Spare.update(
      { location: newLocationId },
      { where: { id } }
    );

    if (updated) {
      res.status(200).json({ message: "Spare location updated successfully", updated_id: id });
    } else {
      res.status(404).json({ message: "Spare not found" });
    }

  } catch (error) {
    console.error("Error updating spare location:", error);
    res.status(500).json({ error: "Error updating spare location" });
  }
};

exports.fetchSpareById = async (req, res) => {
  try {
    const { ean13, partNumber, eswbsSearch } = req.query;

    const where = {};
    if (ean13) where.ean13 = ean13;
    if (partNumber) where.serial_number = partNumber;
    if (eswbsSearch) where.eswbsSearch = eswbsSearch;
    const spares = await Spare.findAll({ where, include: [
      {
        model: Warehouses,
        as: "warehouseData",
        attributes: ["id", "name", "icon_url"]
      },
      {
        model: Location,
        as: "locationData",
        attributes: ["id", "location", "ship_id"]
      }
    ] });

    res.status(200).json({ spares });

  } catch (error) {
    console.error("Error fetching spares:", error);
    res.status(500).json({ error: "Error fetching spares" });
  }
};