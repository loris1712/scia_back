const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Job = sequelize.define("Job", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    maintenance_list_id: { type: DataTypes.INTEGER },
    level_id: { type: DataTypes.INTEGER },
    recurrency_type_id: { type: DataTypes.INTEGER },
    team_id: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, allowNull: false },
    recurrency_days: { type: DataTypes.INTEGER },
    advance_threshold: { type: DataTypes.INTEGER },
    delay_threshold: { type: DataTypes.INTEGER },
    short_description: { type: DataTypes.TEXT },
    long_description: { type: DataTypes.TEXT },
    attachment_pdf_link: { type: DataTypes.TEXT },
    video_link: { type: DataTypes.TEXT }
}, {
    tableName: "Job",
    timestamps: false
});

module.exports = Job;
