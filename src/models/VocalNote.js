const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// JobStatus Model
const VocalNote = sequelize.define("VocalNote", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    failure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    audio_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
}, {
    tableName: "VocalNote",
    timestamps: false
});

module.exports = VocalNote; 