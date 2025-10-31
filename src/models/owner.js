const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Owner = sequelize.define(
  "Owner",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Organisation_name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    country: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    armedForces: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    OrganizationCompanyNCAGE_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "OrganizationCompanyNCAGE", // nome tabella di riferimento
        key: "ID",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    tableName: "Owner",
    timestamps: false,
  }
);

module.exports = Owner;

