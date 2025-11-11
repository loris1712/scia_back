const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ShipFile = sequelize.define("ShipFiles", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ship_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      file_link: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      file_name: {
        type: DataTypes.STRING,
      },
      file_type: {
        type: DataTypes.STRING,
      },
      uploaded_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      description: {
        type: DataTypes.TEXT,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
}, {
    tableName: "ShipFiles",
    timestamps: false,
});

module.exports = ShipFile;