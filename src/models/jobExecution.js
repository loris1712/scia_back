const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const JobExecution = sequelize.define("JobExecution", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    state_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER
    },
    element_eswbs_instance_id: {
        type: DataTypes.INTEGER
    },
    starting_date: {
        type: DataTypes.DATE
    },
    ending_date: {
        type: DataTypes.DATE
    },
    data_recovery_expiration: {
        type: DataTypes.INTEGER
    },
    execution_date: {
        type: DataTypes.DATE
    },
    attachment_link: {
        type: DataTypes.TEXT
    }
}, {
    tableName: "JobExecution",
    timestamps: false
});

module.exports = JobExecution;
