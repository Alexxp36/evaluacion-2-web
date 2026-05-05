const express = require("express");
const sequelize = require("./config/db");
require("dotenv").config();

// ===== MODELOS =====
const TipoMedic = require("./models/TipoMedic");
const Especialidad = require("./models/Especialidad");
const Medicamento = require("./models/Medicamento");

const Laboratorio = require("./models/Laboratorio");
const OrdenCompra = require("./models/OrdenCompra");
const DetalleOrdenCompra = require("./models/DetalleOrdenCompra");

const OrdenVenta = require("./models/OrdenVenta");
const DetalleOrdenVta = require("./models/DetalleOrdenVta");

require("./models/Usuario");

// ===== RELACIONES (FK EXACTAS) =====

// Catálogos
Medicamento.belongsTo(TipoMedic, { foreignKey: "CodTipoMed" });
TipoMedic.hasMany(Medicamento, { foreignKey: "CodTipoMed" });

Medicamento.belongsTo(Especialidad, { foreignKey: "CodEspec" });
Especialidad.hasMany(Medicamento, { foreignKey: "CodEspec" });

// Compras
OrdenCompra.belongsTo(Laboratorio, { foreignKey: "CodLab" });
Laboratorio.hasMany(OrdenCompra, { foreignKey: "CodLab" });

DetalleOrdenCompra.belongsTo(OrdenCompra, { foreignKey: "NroOrdenC" });
OrdenCompra.hasMany(DetalleOrdenCompra, { foreignKey: "NroOrdenC" });

DetalleOrdenCompra.belongsTo(Medicamento, { foreignKey: "CodMedicamento" });
Medicamento.hasMany(DetalleOrdenCompra, { foreignKey: "CodMedicamento" });

// Ventas
DetalleOrdenVta.belongsTo(OrdenVenta, { foreignKey: "NroOrdenVta" });
OrdenVenta.hasMany(DetalleOrdenVta, { foreignKey: "NroOrdenVta" });

DetalleOrdenVta.belongsTo(Medicamento, { foreignKey: "CodMedicamento" });
Medicamento.hasMany(DetalleOrdenVta, { foreignKey: "CodMedicamento" });

// ===== RUTAS =====
const authRoutes = require("./routes/authRoutes");
const medicamentoRoutes = require("./routes/medicamentoRoutes");
const compraRoutes = require("./routes/compraRoutes");
const ventaRoutes = require("./routes/ventaRoutes");

// ===== APP =====
const app = express();
app.use(express.json());

// Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/medicamentos", medicamentoRoutes);
app.use("/api/compras", compraRoutes);
app.use("/api/ventas", ventaRoutes);

// Test
app.get("/", (req, res) => {
  res.json({ message: "API FARMACIA FINAL 🚀" });
});

// ===== DB =====
sequelize.authenticate()
  .then(() => {
    console.log("✅ MySQL conectado");
    return sequelize.sync();
  })
  .then(() => {
    console.log("📦 Tablas listas");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌ Error:", err));