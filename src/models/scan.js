const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Ship = require("./ship");
const Element = require("./element");

const Scans = sequelize.define("Scans", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    ship_id: { type: DataTypes.INTEGER, allowNull: false },
    element_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    result: { type: DataTypes.TEXT },
    scanned_at: { type: DataTypes.DATE },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    tableName: "Scans",
    timestamps: false,
});

Scans.belongsTo(Ship, { foreignKey: "ship_id" });
Ship.hasMany(Scans, { foreignKey: "ship_id" });

Scans.belongsTo(Element, { foreignKey: "element_id" });
Element.hasMany(Scans, { foreignKey: "element_id" });

module.exports = Scans;
