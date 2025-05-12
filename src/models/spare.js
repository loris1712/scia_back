const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Spare = sequelize.define('Spare', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  element_model_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  ship_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ean13: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: { 
    type: DataTypes.STRING,
    allowNull: false,
  },
  serial_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  installation_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  progressive_code: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  warehouse: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  eswbs: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  system_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  original_denomination: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  NCAGE: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  NCAGE_supplier: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Spare',
  timestamps: false,
});

module.exports = Spare;
