// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "No token, autorización denegada" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Buscar el usuario completo
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    req.user = user; // ahora req.user tiene id, username, role, etc.
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token no válido" });
  }
};

