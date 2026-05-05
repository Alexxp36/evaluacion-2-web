const Medicamento = require("../models/Medicamento");

// CREAR
exports.crearMedicamento = async (req, res) => {
  try {
    const {
      descripcionMed,
      precioCompra,
      precioVentaUni,
      CodTipoMed,
      CodEspec
    } = req.body;

    if (!descripcionMed || !precioCompra || !precioVentaUni || !CodTipoMed || !CodEspec) {
      return res.status(400).json({ message: "Campos obligatorios faltantes" });
    }

    const nuevo = await Medicamento.create(req.body);
    res.json(nuevo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LISTAR
exports.obtenerMedicamentos = async (req, res) => {
  try {
    const data = await Medicamento.findAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// OBTENER POR ID (🔥 ESTA FALTABA O ESTABA MAL)
exports.obtenerMedicamento = async (req, res) => {
  try {
    const med = await Medicamento.findByPk(req.params.id);

    if (!med) {
      return res.status(404).json({ message: "No encontrado" });
    }

    res.json(med);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR
exports.actualizarMedicamento = async (req, res) => {
  try {
    const med = await Medicamento.findByPk(req.params.id);

    if (!med) {
      return res.status(404).json({ message: "No encontrado" });
    }

    await med.update(req.body);
    res.json(med);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR
exports.eliminarMedicamento = async (req, res) => {
  try {
    const med = await Medicamento.findByPk(req.params.id);

    if (!med) {
      return res.status(404).json({ message: "No encontrado" });
    }

    await med.destroy();
    res.json({ message: "Eliminado" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};