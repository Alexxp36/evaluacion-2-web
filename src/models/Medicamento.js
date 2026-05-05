const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Medicamento = sequelize.define("Medicamento", {
  CodMedicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  descripcionMed: {
    type: DataTypes.STRING,
    allowNull: false
  },

  fechaFabricacion: {
    type: DataTypes.DATE
  },

  fechaVencimiento: {
    type: DataTypes.DATE
  },

  presentacion: {
    type: DataTypes.STRING
  },

  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  precioCompra: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  precioVentaUni: {
    type: DataTypes.FLOAT,
    allowNull: false
  },

  precioVentaPres: {
    type: DataTypes.FLOAT
  },

  marca: {
    type: DataTypes.STRING
  },

  // FKs con nombres EXACTOS
  CodTipoMed: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  CodEspec: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: "Medicamento",
  timestamps: false
});

module.exports = Medicamento;