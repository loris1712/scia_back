const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrganizationCompanyNCAGE = sequelize.define(
  "OrganizationCompanyNCAGE",
  {
ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    NCAGE_Code: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Da ricercare su: https://eportal.nspa.nato.int/Codification/CageTool/home'
    },
    Organization_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Country: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    City: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Status: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Solo stato A = ACTIVE'
    },
    Street_Line_1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Street_Line 1'
    },
    Street_Line_2: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Street_Line 2'
    },
    Postal_code: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Website: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Phone_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Fax_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Entity: {
      type: DataTypes.STRING(100),
      allowNull: true
    } 
  },
  {
    tableName: "OrganizationCompanyNCAGE",
    timestamps: false, 
  }
);

module.exports = OrganizationCompanyNCAGE;
