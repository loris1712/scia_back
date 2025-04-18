const { Spare, Location, Warehouses } = require("../models");

exports.getSpare = async (req, res) => {
  try {
    const { name, serial_number } = req.query;

    const where = {};
    if (name) where.name = name;
    if (serial_number) where.serial_number = serial_number;
    console.log(serial_number)
    const spares = await Spare.findAll({ where });

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
