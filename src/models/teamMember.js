const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const TeamMember = sequelize.define(
  "TeamMember",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ship_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_leader: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "TeamMembers",
    timestamps: false,
  }
);

module.exports = TeamMember;
