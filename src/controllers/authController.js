const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTRO
exports.register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Validar duplicados
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ message: "Usuario ya existe" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const usuario = await Usuario.create({
      nombre,
      email,
      password: hashedPassword,
      rol
    });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token
    const token = jwt.sign(
      {
        id: usuario.id,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};