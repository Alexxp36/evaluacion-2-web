const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const OrdenCompra = sequelize.define("OrdenCompra", {
  NroOrdenC: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  fecha: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

  situacion: {
    type: DataTypes.STRING,
    defaultValue: "ACTIVA"
  },

  total: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },

  NrofacturaProv: {
    type: DataTypes.STRING
  },

  CodLab: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "OrdenCompra",
  timestamps: false
});

module.exports = OrdenCompra;