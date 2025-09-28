const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Maintenance_List = sequelize.define('Maintenance_List', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_ship: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_ship_model: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: 'Task description',
  },
  order: DataTypes.INTEGER,
  validity_from_date: DataTypes.DATEONLY,
  validity_to_date: DataTypes.DATEONLY,
  last_executed_job: DataTypes.INTEGER,
  System_ElementModel_ID: DataTypes.INTEGER,
  End_Item_ElementModel_ID: DataTypes.INTEGER,
  Maintenance_Item_ElementModel_ID: DataTypes.INTEGER,
  MaintenanceType_ID: DataTypes.INTEGER,
  Maintenance_Frequency: DataTypes.DOUBLE,
  Operational_Not_operational: DataTypes.STRING(100),
  Maintenance_under_condition_description: DataTypes.TEXT('medium'),
  Job_frequency: DataTypes.STRING(100),
  Mean_elapsed_time_MELAP: DataTypes.STRING(100),
  Note: DataTypes.STRING(100),
  Mean_Men_Hours_MMH: DataTypes.STRING(100),
  Personnel_no: DataTypes.INTEGER,
  Personnel_ID: DataTypes.INTEGER,
  RecurrencyType_ID: DataTypes.STRING(100),
  MaintenanceLevel_ID: DataTypes.STRING(100),
  Service_or_Maintenance_Manual_Link: DataTypes.STRING(100),
  Service_or_Maintenance_manual_ParagraphAndPage: {
    type: DataTypes.STRING(100),
    field: "Service_or_Maintenance_manual_Paragraph&Page"
  },
  Check_List: DataTypes.STRING(100),
  Maintenance_procedure_details: DataTypes.STRING(100),
  Reference_document: DataTypes.STRING(100),
  Maintenance_item_no: DataTypes.STRING(100),
  Item_no_on_Maintenance_Item: {
    type: DataTypes.STRING(100),
    field: "Item_no_on Maintenance_Item"
  },
  page: DataTypes.STRING(100),
}, {
  tableName: "Maintenance_List",
  timestamps: false
});

module.exports = Maintenance_List;
