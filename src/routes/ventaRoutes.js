const express = require("express");
const router = express.Router();
const { crearVenta } = require("../controllers/ventaController");
const { verificarToken, verificarRol } = require("../middleware/authMiddleware");

// SOLO VENDEDOR y ADMIN
router.post("/", verificarToken, verificarRol(["VENDEDOR", "ADMIN"]), crearVenta);

module.exports = router;