const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserRole = sequelize.define(
  "UserRole",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "User", // Nome della tabella referenziata
        key: "id",
      },
      onUpdate: "SET NULL",
      onDelete: "SET NULL",
    },
    role_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },    
    rank: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    type: { 
      type: DataTypes.STRING(100),
      allowNull: true,
    }, 
    Elements: {
      type: DataTypes.STRING(200),
      allowNull: true,
    }, 
  },
  {
    tableName: "UserRole",
    timestamps: false,
  }
);

module.exports = UserRole;