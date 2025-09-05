const express = require("express");
const router = express.Router();
const Envio = require("../models/Envio");
const { auth } = require("../middleware/authMiddleware");

// 📌 Obtener todos los envíos
router.get("/", auth, async (req, res) => {
  try {
    let query = {};
    if (req.user.role !== "admin") {
      query.userId = req.user.id; // un usuario normal solo ve sus envíos
    }

    const envios = await Envio.find(query).populate("userId", "name email role");
    res.json(envios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Obtener un envío por ID
router.get("/:id", auth, async (req, res) => {
  try {
    const envio = await Envio.findById(req.params.id).populate("userId", "name email role");
    if (!envio) {
      return res.status(404).json({ msg: "Envío no encontrado" });
    }

    // validación: admin puede ver cualquiera, user solo el suyo
    if (req.user.role !== "admin" && envio.userId._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: "No autorizado" });
    }

    res.json(envio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Crear un envío
router.post("/", auth, async (req, res) => {
  try {
    const { destinatario, direccion, producto, estado } = req.body;

    const newEnvio = new Envio({
      destinatario,
      direccion,
      producto,
      estado: estado || "pendiente",
      userId: req.user.id,
    });

    const savedEnvio = await newEnvio.save();
    console.log("📦 Envío creado:", savedEnvio);
    res.status(201).json(savedEnvio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// 📌 Editar un envío
router.put("/:id", auth, async (req, res) => {
  try {
    const envio = await Envio.findById(req.params.id);
    if (!envio) return res.status(404).json({ msg: "Envío no encontrado" });

    // validación: admin puede editar cualquiera, user solo el suyo
    if (
      req.user.role !== "admin" &&
      envio.userId &&
      String(envio.userId) !== req.user.id
    ) {
      return res.status(403).json({ msg: "No autorizado" });
    }

    const { destinatario, direccion, producto, estado } = req.body;

    if (destinatario) envio.destinatario = destinatario;
    if (direccion) envio.direccion = direccion;
    if (producto) envio.producto = producto;
    if (estado) envio.estado = estado;

    const updatedEnvio = await envio.save();
    res.json(updatedEnvio);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// 📌 Eliminar un envío
router.delete("/:id", auth, async (req, res) => {
  try {
    const envio = await Envio.findById(req.params.id);
    if (!envio) return res.status(404).json({ msg: "Envío no encontrado" });

    // validación: admin puede borrar cualquiera, user solo el suyo
    if (req.user.role !== "admin" && envio.userId.toString() !== req.user.id) {
      return res.status(403).json({ msg: "No autorizado" });
    }

    await envio.deleteOne();
    res.json({ msg: "Envío eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
