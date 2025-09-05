const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { auth } = require("../middleware/authMiddleware"); // 👈 importar middleware solo una vez

// 👉 Registrar usuario
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Verificar si ya existe el usuario
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // por defecto será "user"
    });

    await newUser.save();
    res.status(201).json({ msg: "Usuario registrado con éxito" });
  } catch (err) {
    res.status(500).json({ msg: "Error al registrar usuario", error: err.message });
  }
});

// 👉 Login de usuario
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

    // Crear token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Error en el login", error: err.message });
  }
});

// 📌 Obtener todos los usuarios (solo admin)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "No autorizado" });
    }

    const users = await User.find().select("-password"); // ocultamos password
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener usuarios", error: err.message });
  }
});

module.exports = router;
