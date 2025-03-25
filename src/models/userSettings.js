const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserSettings = sequelize.define(
  "UserSettings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    is_notifications_enabled_maintenance: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    maintenance_frequency: {
      type: DataTypes.ENUM("settimanale", "mensile", "annuale"),
      defaultValue: "mensile",
    },
    is_notifications_enabled_checklist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    checklist_frequency: {
      type: DataTypes.ENUM("settimanale", "mensile", "annuale"),
      defaultValue: "mensile",
    },
    license: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "UserSettings",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = UserSettings;
