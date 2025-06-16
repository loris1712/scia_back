const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Team = sequelize.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    team_leader_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "Team",
    timestamps: false,
  }
);

// Ora importiamo il modello User per creare le associazioni
const User = require("./User");

// Associazioni
Team.belongsTo(User, { as: "teamLeader", foreignKey: "team_leader_id" });
User.belongsTo(Team, { as: "team", foreignKey: "team_id" });

module.exports = Team;
