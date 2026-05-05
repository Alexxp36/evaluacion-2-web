const OrdenCompra = require("../models/OrdenCompra");
const DetalleOrdenCompra = require("../models/DetalleOrdenCompra");
const Medicamento = require("../models/Medicamento");

exports.crearCompra = async (req, res) => {
  try {
    const { CodLab, NrofacturaProv, detalles } = req.body;

    if (!CodLab || !detalles || detalles.length === 0) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const orden = await OrdenCompra.create({
      CodLab,
      NrofacturaProv
    });

    let total = 0;

    for (const item of detalles) {
      const medicamento = await Medicamento.findByPk(item.CodMedicamento);

      if (!medicamento) {
        return res.status(404).json({ message: "Medicamento no existe" });
      }

      const monto = item.cantidad * item.precio;
      total += monto;

      await DetalleOrdenCompra.create({
        NroOrdenC: orden.NroOrdenC,
        CodMedicamento: item.CodMedicamento,
        descripcion: item.descripcion,
        cantidad: item.cantidad,
        precio: item.precio,
        montouni: monto
      });

      // SUBIR STOCK
      medicamento.stock += item.cantidad;
      await medicamento.save();
    }

    orden.total = total;
    await orden.save();

    res.json({ message: "Compra registrada correctamente" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};