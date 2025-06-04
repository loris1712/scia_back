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
    allowNull: true
  },
  state_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  element_eswbs_instance_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  starting_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  ending_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  data_recovery_expiration: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  execution_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  attachment_link: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  recurrency_type_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ship_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  tableName: "JobExecution",
  timestamps: false
});

module.exports = JobExecution;