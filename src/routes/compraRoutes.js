const express = require("express");
const router = express.Router();
const { crearCompra } = require("../controllers/compraController");
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");

// SOLO ALMACEN y ADMIN
router.post("/", verificarToken, verificarRol(["ALMACEN", "ADMIN"]), crearCompra);

module.exports = router;