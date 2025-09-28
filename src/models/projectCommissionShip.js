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
  expected_delivery: {
    type: DataTypes.DATE,
    allowNull: true 
  },
  effective_delivery: { 
    type: DataTypes.DATE,
    allowNull: true
  },
  project_commission_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ship_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: "ProjectCommission",
  timestamps: false
});

module.exports = ProjectCommission;
