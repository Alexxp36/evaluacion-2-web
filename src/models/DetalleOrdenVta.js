const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DetalleOrdenVta = sequelize.define("DetalleOrdenVta", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  NroOrdenVta: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  CodMedicamento: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  descripcionMed: {
    type: DataTypes.STRING
  },

  cantidadRequerida: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "DetalleOrdenVta",
  timestamps: false
});

module.exports = DetalleOrdenVta;