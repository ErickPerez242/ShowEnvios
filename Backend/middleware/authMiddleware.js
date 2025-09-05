const jwt = require("jsonwebtoken");

// Middleware para verificar el token
function auth(req, res, next) {
  // Puedes aceptar el token en "x-auth-token" o en "Authorization: Bearer ..."
  let token = req.header("x-auth-token") || req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No hay token, autorización denegada" });
  }

  // Si viene con "Bearer <token>", lo limpiamos
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // guarda info del usuario (id, role, etc.)
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token no válido" });
  }
}

// Middleware para verificar si es admin
function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Acceso denegado, se requiere rol de administrador" });
  }
  next();
}

module.exports = { auth, isAdmin };


