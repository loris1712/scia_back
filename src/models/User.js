const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Importa l'istanza Sequelize

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    team_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    license_activation_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    license_expiry_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "User",
    timestamps: false, // Se la tabella non ha `createdAt` e `updatedAt`
  }
);

module.exports = User;
