const db = require("../config/db");

// GET - Get all Ships
exports.getAllShips = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM Ship");
    res.json(rows);
  } catch (error) {
    console.error("Error retrieving ships:", error);
    res.status(500).json({ error: "Error retrieving ships" });
  }
};

// GET - Get ship by ID
exports.getShipById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM Ship WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Ship not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error retrieving ship:", error);
    res.status(500).json({ error: "Error retrieving ship" });
  }
};

// POST - Create a new Ship
exports.createShip = async (req, res) => {
  const { ship_model_id, fleet_id, model_code, unit_name, unit_code, launch_date, delivery_date } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Ship (ship_model_id, fleet_id, model_code, unit_name, unit_code, launch_date, delivery_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ship_model_id, fleet_id, model_code, unit_name, unit_code, launch_date, delivery_date]
    );
    res.status(201).json({ message: "Ship successfully created", shipId: result.insertId });
  } catch (error) {
    console.error("Error creating ship:", error);
    res.status(500).json({ error: "Error creating ship" });
  }
};

// PUT - Update Ship
exports.updateShip = async (req, res) => {
  const { id } = req.params;
  const { ship_model_id, fleet_id, model_code, unit_name, unit_code, launch_date, delivery_date } = req.body;
  try {
    const [result] = await db.query(
      "UPDATE Ship SET ship_model_id = ?, fleet_id = ?, model_code = ?, unit_name = ?, unit_code = ?, launch_date = ?, delivery_date = ? WHERE id = ?",
      [ship_model_id, fleet_id, model_code, unit_name, unit_code, launch_date, delivery_date, id]
    );
    if (result.affectedRows === 0) {
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
    const [result] = await db.query("DELETE FROM Ship WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ship not found" });
    }
    res.json({ message: "Ship successfully deleted" });
  } catch (error) {
    console.error("Error deleting ship:", error);
    res.status(500).json({ error: "Error deleting ship" });
  }
};
