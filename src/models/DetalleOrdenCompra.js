const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DetalleOrdenCompra = sequelize.define("DetalleOrdenCompra", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  NroOrdenC: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  CodMedicamento: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  descripcion: {
    type: DataTypes.STRING
  },

  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  montouni: {
    type: DataTypes.FLOAT
  }
}, {
  tableName: "DetalleOrdenCompra",
  timestamps: false
});

module.exports = DetalleOrdenCompra;