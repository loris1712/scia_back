const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Facility = sequelize.define("Facility", {
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    code: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    parent_id: {
        type: DataTypes.STRING(10),
        allowNull: true,
        references: {
            model: "Facilities",
            key: "id",
        },
        onDelete: "SET NULL",
    },
}, {
    tableName: "Facilities",
    timestamps: false,
});

// Relazione gerarchica: un impianto può avere figli e un genitore
Facility.hasMany(Facility, { as: "children", foreignKey: "parent_id" });
Facility.belongsTo(Facility, { as: "parent", foreignKey: "parent_id" });

module.exports = Facility;