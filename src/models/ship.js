const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Element = require("./element");

// Ship Model
const Ship = sequelize.define("Ship", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ship_model_id: { type: DataTypes.INTEGER },
    fleet_id: { type: DataTypes.INTEGER },
    model_code: { type: DataTypes.STRING },
    unit_name: { type: DataTypes.STRING, allowNull: false },
    unit_code: { type: DataTypes.INTEGER },
    launch_date: { type: DataTypes.DATE },
    delivery_date: { type: DataTypes.DATE }
}, {
    tableName: "Ship",
    timestamps: false
});

module.exports = Ship;
