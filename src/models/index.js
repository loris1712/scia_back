const sequelize = require("../config/db");

const Job = require("./job");
const Element = require("./element");
const Ship = require("./ship");
const JobStatus = require("./jobStatus");
const JobExecution = require("./jobExecution");
const UserLogin = require("./userLogin");
const User = require("./user");
const UserRole = require("./userRole.js");
const Team = require("./team.js");
const UserSettings = require("./userSettings.js");

Job.hasMany(JobExecution, { foreignKey: "job_id" });
JobExecution.belongsTo(Job, { foreignKey: "job_id" });

Element.hasMany(JobExecution, { foreignKey: "element_eswbs_instance_id" });
JobExecution.belongsTo(Element, { foreignKey: "element_eswbs_instance_id" });

JobStatus.hasMany(JobExecution, { foreignKey: "state_id" });
JobExecution.belongsTo(JobStatus, { foreignKey: "state_id" });

Element.belongsTo(Ship, { foreignKey: "ship_id" });
Ship.hasMany(Element, { foreignKey: "ship_id" });

Team.belongsTo(User, { as: "leader", foreignKey: "team_leader_id" }); 
User.hasOne(Team, { as: "managedTeam", foreignKey: "team_leader_id" });

User.belongsTo(Team, { as: "userTeam", foreignKey: "team_id" });
Team.hasMany(User, { as: "teamMembers", foreignKey: "team_id" });

const db = { sequelize, Job, Element, Ship, JobStatus, JobExecution, User, UserLogin, UserRole, Team, UserSettings };

module.exports = db;
