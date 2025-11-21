const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProjectCommission = sequelize.define('ProjectCommission', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  date_order: {
    type: DataTypes.DATE,
    allowNull: true
  },
  date_delivery: {
    type: DataTypes.DATE,
    allowNull: true
  },
  owner_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  houseofride: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  shipyard_builder_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: "ProjectCommission",
  timestamps: false
});

module.exports = ProjectCommission;
