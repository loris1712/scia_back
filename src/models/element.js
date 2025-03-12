const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Ship = require("./ship");

const Element = sequelize.define("Element", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    element_model_id: { type: DataTypes.INTEGER },
    ship_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    serial_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    installation_date: { type: DataTypes.DATE },
    progressive_code: { type: DataTypes.INTEGER }
}, {
    tableName: "Element",
    timestamps: false
});

Element.belongsTo(Ship, { foreignKey: "ship_id" });
Ship.hasMany(Element, { foreignKey: "ship_id" });

module.exports = Element;
