const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Assicurati che il path sia corretto

const RecurrencyType = sequelize.define(
  "RecurrencyType",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    from_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    to_days: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }, 
  },
  {
    tableName: "RecurrencyType",
    timestamps: false, 
  }
);

module.exports = RecurrencyType;
