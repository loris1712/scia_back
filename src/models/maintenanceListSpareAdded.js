const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const maintenanceListSpareAdded = sequelize.define('MaintenanceList_SpareAdded', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    maintenanceList_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.TEXT,
    },
    brand: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    part_number: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
}, {
  tableName: "MaintenanceList_SpareAdded",
  timestamps: false
});

module.exports = maintenanceListSpareAdded;
  