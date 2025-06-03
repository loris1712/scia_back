const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// JobStatus Model
const TextNote = sequelize.define("TextNote", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    failure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text_field: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
}, {
    tableName: "TextNote",
    timestamps: false
});

module.exports = TextNote; 