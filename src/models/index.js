const sequelize = require("../config/db");

const Job = require("./job");
const Element = require("./element");
const Ship = require("./ship");
const JobStatus = require("./jobStatus");
const JobExecution = require("./jobExecution");
const UserLogin = require("./userLogin");
const User = require("./User");
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
const Failures = require("./failure.js");
const PhotographicNote = require("./photographicNote.js");
const VocalNote = require("./VocalNote.js");
const TextNote = require("./TextNote.js");
const MaintenanceType = require("./maintenanceType.js");
const ElemetModel = require("./elementModel.js");
const maintenanceLevel = require("./maintenanceLevel.js");
const Maintenance_List = require("./maintenanceList.js");
const StatusCommentsMaintenance = require("./StatusCommentsMaintenance.js");
const maintenanceListSpareAdded = require("./maintenanceListSpareAdded.js");
const Parts = require("./Parts.js");
const OrganizationCompanyNCAGE = require("./OrganizationCompanyNCAGE.js");
const TeamMember = require("./teamMember.js");
const ProjectCommission = require("./projectCommission.js");
const Shipyards = require("./shipyard.js");

Facilities.hasMany(Facilities, { as: "subFacilities", foreignKey: "parent_id" });
Facilities.belongsTo(Facilities, { as: "parentFacility", foreignKey: "parent_id" });

Job.hasMany(JobExecution, { foreignKey: "job_id" });
JobExecution.belongsTo(Job, { foreignKey: "job_id" });

Element.hasMany(JobExecution, { foreignKey: "element_eswbs_instance_id" });
JobExecution.belongsTo(Element, { foreignKey: "element_eswbs_instance_id" });

JobStatus.hasMany(JobExecution, { foreignKey: "status_id" });
JobExecution.belongsTo(JobStatus, { foreignKey: "status_id" });

Element.belongsTo(Ship, { foreignKey: "ship_id", as: "ship" }); 
Ship.hasMany(Element, { foreignKey: "ship_id", as: "elements" });

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

Scans.belongsTo(Ship, { foreignKey: "ship_id", as: "ship" }); 
Ship.hasMany(Scans, { foreignKey: "ship_id", as: "scans" });

Scans.belongsTo(Element, { foreignKey: "element_id", as: "element" });
Element.hasMany(Scans, { foreignKey: "element_id", as: "scans" });

PhotographicNote.belongsTo(User, { foreignKey: 'author', as: 'authorDetails' });
User.hasMany(PhotographicNote, { foreignKey: 'author', as: 'photoNotes' }); 

VocalNote.belongsTo(User, { foreignKey: 'author', as: 'authorDetails' });
User.hasMany(VocalNote, { foreignKey: 'author', as: 'vocalNotes' });

TextNote.belongsTo(User, { foreignKey: 'author', as: 'authorDetails' });
User.hasMany(TextNote, { foreignKey: 'author', as: 'textNotes' });

JobExecution.belongsTo(recurrencyType, { foreignKey: 'recurrency_type_id', as: 'recurrencyType' });
JobExecution.belongsTo(Job, { foreignKey: 'job_id', as: 'job' });
JobExecution.belongsTo(JobStatus, { foreignKey: 'status_id', as: 'status' });

Element.belongsTo(ElemetModel, {
  foreignKey: 'element_model_id',
  as: 'element_model'
});

Job.belongsTo(Maintenance_List, {
  foreignKey: 'maintenance_list_id',
  as: 'maintenance_list',
});

Maintenance_List.hasMany(Job, {
  foreignKey: 'maintenance_list_id',
  as: 'jobs',
});

Maintenance_List.belongsTo(maintenanceLevel, {
    foreignKey: "MaintenanceLevel_ID",
    as: "maintenance_level",
});

maintenanceLevel.hasMany(Maintenance_List, {
    foreignKey: "MaintenanceLevel_ID",
    as: "maintenance_lists",
});

JobExecution.hasMany(VocalNote, { foreignKey: "task_id", as: "vocalNotes" });
JobExecution.hasMany(TextNote, { foreignKey: "task_id", as: "textNotes" });
JobExecution.hasMany(PhotographicNote, { foreignKey: "task_id", as: "photographicNotes" });

Ship.belongsTo(Team, { foreignKey: "team", as: "teamData" });
Team.hasMany(Ship, { foreignKey: "team", as: "ships" });

Spare.belongsTo(ElemetModel, { foreignKey: 'element_model_id', as: 'elementModel' });

Team.hasMany(Job, { foreignKey: 'team_id', as: 'jobs' });
Job.belongsTo(Team, { foreignKey: 'team_id', as: 'team' });

User.hasMany(TeamMember, { foreignKey: "user_id", as: "userTeamMembers" });
Team.hasMany(TeamMember, { foreignKey: "team_id", as: "teamTeamMembers" });
Ship.hasMany(TeamMember, { foreignKey: "ship_id", as: "shipTeamMembers" });

TeamMember.belongsTo(User, { foreignKey: "user_id", as: "user" });
TeamMember.belongsTo(Team, { foreignKey: "team_id", as: "team" });
TeamMember.belongsTo(Ship, { foreignKey: "ship_id", as: "ship" });

User.hasOne(UserRole, { foreignKey: "user_id", as: "role" });
UserRole.belongsTo(User, { foreignKey: "user_id", as: "roleUser" });

User.hasOne(UserLogin, { foreignKey: "user_id", as: "login" });
UserLogin.belongsTo(User, { foreignKey: "user_id", as: "loginUser" });

Failures.belongsTo(User, { foreignKey: "userExecution", as: "userExecutionData" });
User.hasMany(Failures, { foreignKey: "userExecution", as: "executedFailures" });

Spare.belongsTo(Parts, { foreignKey: "Parts_ID", as: "part" });
Parts.hasMany(Spare, { foreignKey: "Parts_ID", as: "spares" });

Parts.belongsTo(OrganizationCompanyNCAGE, { 
  foreignKey: "OrganizationCompanyNCAGE_ID", 
  as: "organizationCompanyNCAGE" 
});

OrganizationCompanyNCAGE.hasMany(Parts, { 
  foreignKey: "OrganizationCompanyNCAGE_ID", 
  as: "parts" 
});

Maintenance_List.belongsTo(recurrencyType, {
  foreignKey: "RecurrencyType_ID",
  as: "recurrencyType",
});

recurrencyType.hasMany(Maintenance_List, {
  foreignKey: "RecurrencyType_ID",
  as: "maintenance_lists",
});


const db = { sequelize, Job, Element, Ship, JobStatus, 
  JobExecution, User, UserLogin, UserRole, Team, UserSettings, Spare, 
  RanksMarine, Task, recurrencyType, Facilities, Cart, Location, Warehouses,
  ShipFiles, Readings, ReadingsType, Scans, Failures, PhotographicNote, VocalNote, TextNote,
  MaintenanceType, ElemetModel, maintenanceLevel, Maintenance_List,
  StatusCommentsMaintenance, maintenanceListSpareAdded, Parts, OrganizationCompanyNCAGE,
  TeamMember, ProjectCommission, Shipyards };

module.exports = db;
