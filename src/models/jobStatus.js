const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// JobStatus Model
const JobStatus = sequelize.define("JobStatus", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    tableName: "JobStatus",
    timestamps: false
});

module.exports = JobStatus;
