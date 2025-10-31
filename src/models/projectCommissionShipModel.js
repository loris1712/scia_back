const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const ProjectCommissionShipModel = sequelize.define('ProjectCommissionShipModel', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  expected_delivery: {
    type: DataTypes.DATE,
    allowNull: true 
  },
  effective_delivery: { 
    type: DataTypes.DATE,
    allowNull: true
  },
  ship_model_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ship_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: "ProjectCommissionShipModel",
  timestamps: false
});

module.exports = ProjectCommissionShipModel;
