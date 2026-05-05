const jwt = require("jsonwebtoken");

// ==========================
// VERIFICAR TOKEN
// ==========================
exports.verificarToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // ❌ No viene header
    if (!authHeader) {
      return res.status(401).json({ message: "Token requerido" });
    }

    // ❌ Formato incorrecto
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    // 🔥 EXTRAER TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token vacío" });
    }

    // 🔐 VERIFICAR TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardar usuario en request
    req.usuario = decoded;

    next();

  } catch (error) {
    return res.status(403).json({
      message: "Token inválido",
      error: error.message
    });
  }
};

// ==========================
// VERIFICAR ROL
// ==========================
exports.verificarRol = (rolesPermitidos) => {
  return (req, res, next) => {
    try {
      if (!req.usuario) {
        return res.status(403).json({ message: "No autorizado" });
      }

      if (!rolesPermitidos.includes(req.usuario.rol)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      next();

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
};