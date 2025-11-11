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
      allowNull: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    audio_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }, 
    author: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
}, {
    tableName: "VocalNote",
    timestamps: false
});

module.exports = VocalNote; 