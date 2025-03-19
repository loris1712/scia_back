const { Ship } = require("../models");

// GET - Get all Ships
exports.getAllShips = async (req, res) => {
  try {
    const ships = await Ship.findAll();
    res.json(ships);
  } catch (error) {
    console.error("Error retrieving ships:", error);
    res.status(500).json({ error: "Error retrieving ships" });
  }
};

// GET - Get ship by ID
exports.getShipById = async (req, res) => {
  const { id } = req.params;
  try {
    const ship = await Ship.findByPk(id);
    if (!ship) {
      return res.status(404).json({ error: "Ship not found" });
    }
    res.json(ship);
  } catch (error) {
    console.error("Error retrieving ship:", error);
    res.status(500).json({ error: "Error retrieving ship" });
  }
};

// POST - Create a new Ship
exports.createShip = async (req, res) => {
  try {
    const ship = await Ship.create(req.body);
    res.status(201).json({ message: "Ship successfully created", ship });
  } catch (error) {
    console.error("Error creating ship:", error);
    res.status(500).json({ error: "Error creating ship" });
  }
};

// PUT - Update Ship
exports.updateShip = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Ship.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Ship not found" });
    }

    res.json({ message: "Ship successfully updated" });
  } catch (error) {
    console.error("Error updating ship:", error);
    res.status(500).json({ error: "Error updating ship" });
  }
};

// DELETE - Delete Ship
exports.deleteShip = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Ship.destroy({
      where: { id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Ship not found" });
    }

    res.json({ message: "Ship successfully deleted" });
  } catch (error) {
    console.error("Error deleting ship:", error);
    res.status(500).json({ error: "Error deleting ship" });
  }
};
