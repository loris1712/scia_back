const { Team, User, TeamMember, UserLogin } = require("../../models");
require("dotenv").config();

exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: User,
          as: "leader",
          include: [
            {
              model: UserLogin,
              as: "login",
              attributes: ["email"],
            },
          ],
        },
      ],
    });

    return res.json(teams);
  } catch (error) {
    console.error("Errore nel recupero squadre:", error);
    return res.status(500).json({ error: "Errore nel recupero squadre" });
  }
};

/* 🔹 PUT - Aggiorna le informazioni di un team */
exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, manager, email, active } = req.body;

    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: "Team non trovato" });
    }

    team.name = name ?? team.name;
    team.role = role ?? team.role;
    team.manager = manager ?? team.manager;
    team.email = email ?? team.email;
    team.active = active ?? team.active;

    await team.save();

    return res.json({ message: "Team aggiornato con successo", team });
  } catch (error) {
    console.error("Errore aggiornamento team:", error);
    return res.status(500).json({ error: "Errore durante l'aggiornamento del team" });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const members = await TeamMember.findAll({
      where: { team_id: id },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "first_name", "last_name"],
          include: [
            {
              model: require("../../models/userLogin"),
              as: "login",
              attributes: ["email"],
            },
          ],
        },
      ],
    });

    // 🔹 Prepara il risultato con l'email del login
    const users = members.map((m) => {
      const u = m.user?.toJSON();
      return {
        id: u?.id,
        first_name: u?.first_name,
        last_name: u?.last_name,
        email: u?.login?.email || null,
      };
    });

    return res.json(users);
  } catch (error) {
    console.error("Errore nel recupero membri del team:", error);
    return res.status(500).json({ error: "Errore nel recupero membri del team" });
  }
};

exports.updateTeamMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { members } = req.body; 

    if (!Array.isArray(members)) {
      return res.status(400).json({ error: "Formato non valido: members deve essere un array di ID utenti" });
    }

    const team = await Team.findByPk(id);
    if (!team) {
      return res.status(404).json({ error: "Team non trovato" });
    }

    await TeamMember.destroy({ where: { team_id: id } });

    const newMembers = members.map((userId) => ({
      team_id: id,
      user_id: userId,
    }));

    if (newMembers.length > 0) {
      await TeamMember.bulkCreate(newMembers);
    }

    return res.json({ message: "Membri del team aggiornati con successo" });
  } catch (error) {
    console.error("Errore aggiornamento membri team:", error);
    return res.status(500).json({ error: "Errore durante l'aggiornamento membri team" });
  }
};
