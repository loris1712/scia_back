const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MaintenanceGroup = sequelize.define(
  "MaintenanceGroup",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "Maintenance_group",
    timestamps: false,
  }
);

module.exports = MaintenanceGroup;
