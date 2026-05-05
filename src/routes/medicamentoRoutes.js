const express = require("express");
const router = express.Router();

const medicamentoController = require("../controllers/medicamentoController");
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");

// CREAR
router.post("/", verificarToken, verificarRol(["ADMIN", "ALMACEN"]), medicamentoController.crearMedicamento);

// LISTAR
router.get("/", verificarToken, medicamentoController.obtenerMedicamentos);

// OBTENER POR ID
router.get("/:id", verificarToken, medicamentoController.obtenerMedicamento);

// ACTUALIZAR
router.put("/:id", verificarToken, verificarRol(["ADMIN", "ALMACEN"]), medicamentoController.actualizarMedicamento);

// ELIMINAR
router.delete("/:id", verificarToken, verificarRol(["ADMIN"]), medicamentoController.eliminarMedicamento);

module.exports = router;