const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Parts = sequelize.define(
  "Parts",
  {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Part_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    OrganizationCompanyNCAGE_ID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: 'Va indicata la ragione sociale della Tabella OrganizationCompanyNCAGE'
    },
    Original_description: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Part_Number: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Va indicato in NCAGE dell'OEM"
    },
    Dimension_L: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Prezzo unitario espresso in EUR"
    },
    Dimension_W: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Dimension_H: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Dimensions_LxWxH: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Weight: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Peso espresso in kg"
    },
    Volume: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Volume espresso in mm3"
    },
    NSN: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "NATO Stock Number"
    },
    Document_file_link: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Collegamento al datasheet/disegno"
    },
    Position_on_Document_file: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Datasheet_file_link: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Link a datasheet del Part Number"
    },
    Parent_Parts_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Power_supply: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Rated_Voltage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Rated_current: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Rated_power: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Revolution_speed: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Nominal_pressure_NP: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Nominal_Diameter_ND: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MTBF: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MCBF: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MTTR: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MTBR: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    MTTO: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Model_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Repair_Time: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    PartsSupplierType_ID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Drawing_number: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Drawing_number_revision_index: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    Drawing_title: {
      type: DataTypes.STRING(100),
      allowNull: true
    }  
  },
  {
    tableName: "Parts",
    timestamps: false, 
  }
);

module.exports = Parts;
