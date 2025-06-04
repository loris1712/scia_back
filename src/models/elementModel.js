const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Ship = require("./ship");

const ElementModel = sequelize.define("ElementModel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    parent_element_model_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ship_model_id: DataTypes.INTEGER,
    ESWBS_code: DataTypes.STRING,
    LCN_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Supplier_Parts_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Installed_quantity_on_End_Item: DataTypes.INTEGER,
    Manufacturer_Parts_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Installed_Quantity_on_Ship: DataTypes.INTEGER,
    ContractualBreakdown_ID: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    LCNtype_ID: DataTypes.INTEGER,
    Heat_transfer_to_air: DataTypes.STRING,
    Heat_transfer_to_water: DataTypes.BIGINT,
    Power_supply: DataTypes.STRING,
    RatedPower: DataTypes.STRING,
    Shipyard_arrangement_drawing_link: DataTypes.STRING,
    Position_on_arrangement_drawing: DataTypes.STRING,
    Reference_Designator: DataTypes.STRING,
    Shock_mounts_Vibration_mounts: DataTypes.STRING,
    Ship_Area_Room_Code: DataTypes.STRING,
    ElementModel_installation_drawing_link: DataTypes.STRING,
    Yearly_Operating_Hours: DataTypes.STRING,
    Yearly_Operating_Hours_during_missions: DataTypes.STRING,
    Criticality_Code_CC: DataTypes.STRING,
    Repairability_Code_CR: DataTypes.STRING,
    Replaceability_Code_CS: DataTypes.STRING,
    Alternate_LCN_ALC: DataTypes.STRING,
    Level1: DataTypes.STRING,
    Level2: DataTypes.STRING,
    Level4: DataTypes.STRING,
    Level5: DataTypes.STRING,
    Level6: DataTypes.STRING,
    Level7: DataTypes.STRING,
    Level8: DataTypes.STRING,
    Level19: DataTypes.STRING,
    XG_Center_of_gravity: DataTypes.STRING,
    YG_Center_of_gravity: DataTypes.STRING,
    ZG_Center_of_gravity: DataTypes.STRING,
    Installed_quantity_on_next_higher_assy: DataTypes.STRING,
    Absorbed_current: DataTypes.STRING,
    Revolution_speed: DataTypes.STRING,
    Operating_pressure: DataTypes.STRING,
    Mass_flow: DataTypes.STRING,
    Delivery_Head: DataTypes.STRING,
    Test_pressure: DataTypes.STRING,
}, {
    tableName: "ElementModel",
    timestamps: false
});

module.exports = ElementModel;
