const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrdenVenta = sequelize.define("OrdenVenta", {
  NroOrdenVta: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  motivo: {
    type: DataTypes.STRING
  },

  situacion: {
    type: DataTypes.STRING,
    defaultValue: "ACTIVA"
  }
}, {
  tableName: "OrdenVenta",
  timestamps: false
});

module.exports = OrdenVenta;