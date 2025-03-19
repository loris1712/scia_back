const { Element } = require("../models");

exports.addElementTimeWork = async (req, res) => {
  try {
    const element = await Element.create(req.body);
    res.status(201).json({ message: "Element successfully added", element });
  } catch (error) {
    console.error("Error creating element:", error);
    res.status(500).json({ error: "Error creating element" });
  }
};

exports.updateElement = async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Element.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).json({ error: "Element not found" });
    }

    res.json({ message: "Element successfully updated" });
  } catch (error) {
    console.error("Error updating element:", error);
    res.status(500).json({ error: "Error updating element" });
  }
};

