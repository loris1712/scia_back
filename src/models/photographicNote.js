const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// JobStatus Model
const PhotographicNote = sequelize.define("PhotographicNote", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    failure_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
}, {
    tableName: "PhotographicNote",
    timestamps: false
});

module.exports = PhotographicNote; 