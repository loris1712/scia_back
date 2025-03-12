const sequelize = require("../config/db");

const Job = require("./job");
const Element = require("./element");
const Ship = require("./ship");
const JobStatus = require("./jobStatus");
const JobExecution = require("./jobExecution");

Job.hasMany(JobExecution, { foreignKey: "job_id" });
JobExecution.belongsTo(Job, { foreignKey: "job_id" });

Element.hasMany(JobExecution, { foreignKey: "element_eswbs_instance_id" });
JobExecution.belongsTo(Element, { foreignKey: "element_eswbs_instance_id" });

JobStatus.hasMany(JobExecution, { foreignKey: "state_id" });
JobExecution.belongsTo(JobStatus, { foreignKey: "state_id" });

Element.belongsTo(Ship, { foreignKey: "ship_id" });
Ship.hasMany(Element, { foreignKey: "ship_id" });

const db = { sequelize, Job, Element, Ship, JobStatus, JobExecution };

module.exports = db;