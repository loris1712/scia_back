const { Team, User, TeamMember, UserLogin, UserRole } = require("../../models");
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

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      role,
      manager,
      email,
      active,
      leader,
    } = req.body;

    const team = await Team.findByPk(id, {
      include: [
        {
          model: User,
          as: "leader",
          include: [{ model: UserLogin, as: "login" }],
        },
      ],
    });

    if (!team) {
      return res.status(404).json({ error: "Team non trovato" });
    }

    team.name = name ?? team.name;
    team.role = role ?? team.role;
    team.manager = manager ?? team.manager;
    team.email = email ?? team.email;
    team.active = active ?? team.active;

    await team.save();

    if (leader && team.leader) {
      const user = team.leader;

      if (leader.first_name) user.first_name = leader.first_name;
      if (leader.last_name) user.last_name = leader.last_name;

      await user.save();

      if (leader.login && leader.login.email && user.login) {
        user.login.email = leader.login.email;
        await user.login.save();
      }
    }

    const updatedTeam = await Team.findByPk(id, {
      include: [
        {
          model: User,
          as: "leader",
          include: [{ model: UserLogin, as: "login" }],
        },
      ],
    });

    return res.json({
      message: "Team aggiornato con successo",
      team: updatedTeam,
    });
  } catch (error) {
    console.error("Errore aggiornamento team:", error);
    return res
      .status(500)
      .json({ error: "Errore durante l'aggiornamento del team" });
  }
};

exports.getTeamMembers = async (req, res) => {
  try {
    const { id } = req.params;

    const members = await TeamMember.findAll({
      where: { team_id: id },
      attributes: ["user_id", "is_leader"],
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
            {
              model: require("../../models/userRole"),
              as: "role", // 👈 coerente con la definizione User.hasOne(UserRole, { as: "role" })
              attributes: ["rank", "type", "Elements", "role_name"],
            },
          ],
        },
      ],
    });

    // 🔹 Prepara il risultato completo con tutte le info utente + ruolo + elementi
    const users = members.map((m) => {
      const u = m.user?.toJSON();
      const r = u?.role || {};

      return {
        id: u?.id,
        first_name: u?.first_name,
        last_name: u?.last_name,
        email: u?.login?.email || null,
        is_leader: m.is_leader || false,
        role_name: r.role_name || "",
        rank: r.rank || "",
        type: r.type || "",
        elements: r.Elements || "",
      };
    });

    return res.json(users);
  } catch (error) {
    console.error("❌ Errore nel recupero membri del team:", error);
    return res
      .status(500)
      .json({ error: "Errore nel recupero membri del team" });
  }
};


exports.updateTeamMembers = async (req, res) => {
  try {
    const { id } = req.params;
    const { members } = req.body;

    if (!Array.isArray(members)) {
      return res.status(400).json({ error: "Formato non valido: members deve essere un array" });
    }

    const team = await Team.findByPk(id);
    if (!team) return res.status(404).json({ error: "Team non trovato" });

    await TeamMember.destroy({ where: { team_id: id } });

    for (const member of members) {
      if (!member.user_id) continue;

      await TeamMember.create({
        team_id: id,
        user_id: member.user_id,
        is_leader: !!member.is_leader
      });

      // ✅ Aggiorna o crea il ruolo dell’utente
      const [role] = await UserRole.findOrCreate({
        where: { user_id: member.user_id },
        defaults: {
          role_name: member.role_name || "Member",
          Elements: member.elements || null
        }
      });

      await role.update({
        role_name: member.role_name || role.role_name,
        Elements: member.elements || role.Elements
      });
    }

    return res.json({ message: "Membri e ruoli aggiornati con successo" });
  } catch (error) {
    console.error("Errore aggiornamento membri team:", error);
    return res.status(500).json({ error: "Errore durante l'aggiornamento membri team" });
  }
};


