const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Shipyard Model
const Shipyard = sequelize.define("Shipyard", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  companyName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  OrganizationCompanyNCAGE_ID: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: "Shipyard",
  timestamps: false
});

module.exports = Shipyard;
