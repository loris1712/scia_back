const { Element, ElemetModel, Ship } = require("../models");

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

exports.getElements = async (req, res) => {
  const { ship_id } = req.params;

  try {
    if (!ship_id) {
      return res.status(400).json({ error: "Missing ship_id parameter" });
    }

    const ship = await Ship.findOne({
      where: { id: ship_id },
    });

    if (!ship) {
      return res.status(404).json({ error: "Ship not found" });
    }

    const flatElements = await ElementModel.findAll({
      where: { ship_model_id: ship.ship_model_id },
      raw: true,
    });

    if (!flatElements || flatElements.length === 0) {
      return res.status(404).json({ error: "Elements not found" });
    }

    // Funzione per trasformare in albero
    const buildTree = (items, parentId = 0) => {
      return items
        .filter(item => item.parent_element_model_id === parentId)
        .map(item => ({
          id: item.id.toString(),
          name: item.LCN_name,
          code: item.ESWBS_code || undefined,
          children: buildTree(items, item.id),
        }));
    };

    const tree = buildTree(flatElements);

    return res.status(200).json(tree);
  } catch (error) {
    console.error("Error retrieving elements:", error);
    return res.status(500).json({ error: "Server error while retrieving elements" });
  }
};

