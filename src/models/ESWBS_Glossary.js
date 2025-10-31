const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ESWBS_Glossary = sequelize.define(
  "ESWBS_Glossary",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    eswbs_glossary_code: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    macrogroup: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    level1: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    level2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    level3: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    level: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    name_navsea_S9040IDX: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    long_description_ita: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    short_description_ita: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "ESWBS_Glossary",
    timestamps: false,
  }
);

module.exports = ESWBS_Glossary;
