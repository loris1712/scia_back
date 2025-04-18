const { Facilities } = require("../models");

exports.getFacilities = async (req, res) => {
  try {
    const facilities = await Facilities.findAll({
      include: [
        {
          model: Facilities,
          as: "subFacilities",
        },
      ],
    });

    res.status(200).json(facilities);
  } catch (error) {
    console.error("Errore nel recupero delle facilities:", error);
    res.status(500).json({ error: "Errore nel recupero delle facilities" });
  }
};



