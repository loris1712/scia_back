const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ShipModel = sequelize.define(
  "ShipModel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shipyard_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    commission_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    model_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    model_code: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    Overall_length_LOA: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Lunghezza fuori tutto della nave [metri]",
    },
    Breadth_moulded_Bmax: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Larghezza massima della nave [metri]",
    },
    Depth_moulded_D: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Altezza di costruzione della nave [metri]",
    },
    Max_Draft: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Pescaggio [metri]",
    },
    Displacement_fully_loaded: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: "Dislocamento a pieno carico [tonnellate]",
      field: "Displacement_fully loaded", // 👈 nome colonna originale con spazio
    },
    Maximum_Speed: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Velocità massima [nodi]",
    },
    Cruising_speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Velocità di crociera [nodi]",
    },
    range: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Logistic_range: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Autonomia logistica [giorni]",
    },
    Crew: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Numero di persone imbarcate",
    },
    Ship_Logistic_Model_Identification: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment:
        "Codice di due digit identificativo della nave (es. F1 = Piattaforma FREMM)",
    },
  },
  {
    tableName: "ShipModel",
    timestamps: false,
  }
);

module.exports = ShipModel;
