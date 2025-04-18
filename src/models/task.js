const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // assuming you have a database configuration file

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    element_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idMaintenanceRoutine: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    levelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    recurrenceTypeId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    denomination: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    recurrenceDays: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    earlyThreshold: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    delayThreshold: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    extendedDescriptionHTML: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pdfAttachment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    ship_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'Task',
    timestamps: false, // assuming you don't want createdAt and updatedAt fields
  }
);

module.exports = Task;