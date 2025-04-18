const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Reading = sequelize.define("ReadingsType", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "ReadingsType",
  timestamps: false,
});

module.exports = Reading;
