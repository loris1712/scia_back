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
const Spare = require("./spare.js"); 
const RanksMarine = require("./RanksMarine.js"); 
const Task = require("./task.js"); 
const recurrencyType = require("./recurrencyType.js"); 
const Facilities = require("./facilities.js"); 
const Cart = require("./cart.js"); 
const Location = require("./location.js"); 
const Warehouses = require("./warehouses.js"); 
const ShipFiles = require("./shipFile2.js");
const Readings = require("./Reading.js");
const ReadingsType = require("./ReadingsType.js");
const Scans = require("./scan.js");

// Relazioni con alias espliciti

Facilities.hasMany(Facilities, { as: "subFacilities", foreignKey: "parent_id" });
Facilities.belongsTo(Facilities, { as: "parentFacility", foreignKey: "parent_id" });

Job.hasMany(JobExecution, { foreignKey: "job_id" });
JobExecution.belongsTo(Job, { foreignKey: "job_id" });

Element.hasMany(JobExecution, { foreignKey: "element_eswbs_instance_id" });
JobExecution.belongsTo(Element, { foreignKey: "element_eswbs_instance_id" });

JobStatus.hasMany(JobExecution, { foreignKey: "state_id" });
JobExecution.belongsTo(JobStatus, { foreignKey: "state_id" });

Element.belongsTo(Ship, { foreignKey: "ship_id", as: "ship" }); // Alias 'ship' per questa associazione
Ship.hasMany(Element, { foreignKey: "ship_id", as: "elements" }); // Alias 'elements' per questa associazione

Team.belongsTo(User, { as: "leader", foreignKey: "team_leader_id" }); 
User.hasOne(Team, { as: "managedTeam", foreignKey: "team_leader_id" });

User.belongsTo(Team, { as: "userTeam", foreignKey: "team_id" });
Team.hasMany(User, { as: "teamMembers", foreignKey: "team_id" });

Task.belongsTo(Element, { foreignKey: "element_id", as: "element" });
Element.hasMany(Task, { foreignKey: "element_id" });

Cart.belongsTo(Spare, { foreignKey: "spare_id" });
Spare.hasMany(Cart, { foreignKey: "spare_id" });

Location.belongsTo(Warehouses, {
  foreignKey: "warehouse",
  as: "warehouseInfo"
});

Warehouses.hasMany(Location, {
  foreignKey: "warehouse",
  as: "locations"
});

Spare.belongsTo(Warehouses, { foreignKey: "warehouse", as: "warehouseData" });
Spare.belongsTo(Location, { foreignKey: "location", as: "locationData" });

Readings.belongsTo(ReadingsType, {
  foreignKey: 'reading_type',
  as: 'type'
});

Readings.belongsTo(Element, {
  foreignKey: "eswbs_id",
  as: "element",
});

Scans.belongsTo(Ship, { foreignKey: "ship_id", as: "ship" }); // Alias 'ship' per questa associazione
Ship.hasMany(Scans, { foreignKey: "ship_id", as: "scans" }); // Alias 'scans' per questa associazione

Scans.belongsTo(Element, { foreignKey: "element_id", as: "element" });
Element.hasMany(Scans, { foreignKey: "element_id", as: "scans" });

const db = { sequelize, Job, Element, Ship, JobStatus, 
  JobExecution, User, UserLogin, UserRole, Team, UserSettings, Spare, 
  RanksMarine, Task, recurrencyType, Facilities, Cart, Location, Warehouses,
  ShipFiles, Readings, ReadingsType, Scans };

module.exports = db;
