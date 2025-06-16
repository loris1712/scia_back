const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Maintenance_Level = sequelize.define('Maintenance_Level', {
id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Level_MIL_STD_1388: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    Description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Level_MMI: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Industry_Level: {
      type: DataTypes.STRING(100),
      allowNull: true,
    }
}, {
  tableName: "Maintenance_Level",
  timestamps: false
});

module.exports = Maintenance_Level;
  