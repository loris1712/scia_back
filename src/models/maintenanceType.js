const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// JobStatus Model
const maintenanceType = sequelize.define("Maintenance_Type", {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Maintenance_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'Inserire il tipo di manutenzione'
    },
    Recurrency_type: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
}, {
    tableName: "Maintenance_Type",
    timestamps: false
});

module.exports = maintenanceType; 