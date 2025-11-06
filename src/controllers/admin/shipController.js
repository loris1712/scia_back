const { Ship, TeamMember } = require("../../models");

exports.getShipsByModel = async (req, res) => {
  try {
    const { userId, shipModelId } = req.params;

    if (!userId || !shipModelId) {
      return res
        .status(400)
        .json({ error: "Parametri mancanti: userId o shipModelId" });
    }

    const memberships = await TeamMember.findAll({
      where: { user_id: userId },
      attributes: ["team_id"],
    });

    if (memberships.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        ships: [],
        message: "Nessun team associato a questo utente",
      });
    }

    const teamIds = memberships.map((m) => m.team_id);

    console.log(teamIds)

    const ships = await Ship.findAll({
      where: {
        ship_model_id: shipModelId,
        team: teamIds,
      },
      order: [["id", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      count: ships.length,
      ships,
    });
  } catch (error) {
    console.error("❌ Errore nel recupero navi per modello:", error);
    return res.status(500).json({ error: "Errore interno del server" });
  }
};


