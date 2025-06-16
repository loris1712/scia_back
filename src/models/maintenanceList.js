const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Maintenance_List = sequelize.define('Maintenance_List', {
 id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_ship: DataTypes.INTEGER,
    id_ship_model: DataTypes.INTEGER,
    name: DataTypes.STRING,
    order: DataTypes.INTEGER,
    validity_from_date: DataTypes.DATE,
    validity_to_date: DataTypes.DATE,
    last_executed_job: DataTypes.INTEGER,
    System_ElementModel_ID: DataTypes.INTEGER,
    End_Item_ElementModel_ID: DataTypes.INTEGER,
    Maintenance_Item_ElementModel_ID: DataTypes.INTEGER,
    MaintenanceType_ID: DataTypes.INTEGER,
    Maintenance_Frequency: DataTypes.DOUBLE,
    Operational_Not_operational: DataTypes.STRING,
    Maintenance_under_condition_description: DataTypes.STRING,
    Job_frequency: DataTypes.STRING,
    Mean_elapsed_time_MELAP: DataTypes.STRING,
    Note: DataTypes.STRING,
    Mean_Men_Hours_MMH: DataTypes.STRING,
    Personnel_no: DataTypes.INTEGER,
    Personnel_ID: DataTypes.INTEGER,
    RecurrencyType_ID: DataTypes.STRING,
    MaintenanceLevel_ID: DataTypes.STRING,
    Service_or_Maintenance_Manual_Link: DataTypes.STRING,
    Service_or_Maintenance_manual_ParagraphAndPage: {
      type: DataTypes.STRING,
      field: "Service_or_Maintenance_manual_Paragraph&Page"
    },
    Check_List: DataTypes.STRING,
    Maintenance_procedure_details: DataTypes.STRING,
}, {
  tableName: "Maintenance_List",
  timestamps: false
});

module.exports = Maintenance_List;
  