const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    registration_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    bot_id_ita: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bot_id_ing: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    bot_id_esp: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "User",
    timestamps: false,
  }
);

module.exports = User;
