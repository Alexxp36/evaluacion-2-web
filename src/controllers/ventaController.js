const OrdenVenta = require("../models/OrdenVenta");
const DetalleOrdenVta = require("../models/DetalleOrdenVta");
const Medicamento = require("../models/Medicamento");

exports.crearVenta = async (req, res) => {
  try {
    const { motivo, detalles } = req.body;

    if (!detalles || detalles.length === 0) {
      return res.status(400).json({ message: "Detalles requeridos" });
    }

    const orden = await OrdenVenta.create({ motivo });

    // VALIDAR STOCK PRIMERO
    for (const item of detalles) {
      const medicamento = await Medicamento.findByPk(item.CodMedicamento);

      if (!medicamento) {
        return res.status(404).json({ message: "Medicamento no existe" });
      }

      if (medicamento.stock < item.cantidadRequerida) {
        return res.status(400).json({ message: "Stock insuficiente" });
      }
    }

    // CREAR Y DESCONTAR
    for (const item of detalles) {
      const medicamento = await Medicamento.findByPk(item.CodMedicamento);

      await DetalleOrdenVta.create({
        NroOrdenVta: orden.NroOrdenVta,
        CodMedicamento: item.CodMedicamento,
        descripcionMed: item.descripcionMed,
        cantidadRequerida: item.cantidadRequerida
      });

      medicamento.stock -= item.cantidadRequerida;
      await medicamento.save();
    }

    res.json({ message: "Venta registrada correctamente" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};