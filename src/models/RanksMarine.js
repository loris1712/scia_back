// models/GradiMarina.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RanksMarine = sequelize.define('RanksMarine', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  grado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  distintivo_controspallina: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  codice_nato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "RanksMarine",
  timestamps: false
});

module.exports = RanksMarine;