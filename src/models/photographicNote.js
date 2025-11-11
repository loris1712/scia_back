const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const PhotographicNote = sequelize.define("PhotographicNote", {
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
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }, 
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  type: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: "PhotographicNote",
  timestamps: false,
});

module.exports = PhotographicNote;
