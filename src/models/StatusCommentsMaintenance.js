const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const StatusCommentsMaintenance = sequelize.define('Status_Comments_Maintenance', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    maintenance_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_flag: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    reason: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    only_this: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    all_from_this_product: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    old_status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    new_status_id: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
}, {
  tableName: "Status_Comments_Maintenance",
  timestamps: false
});

module.exports = StatusCommentsMaintenance;
  