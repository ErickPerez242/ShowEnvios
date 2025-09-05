const express = require("express");
const Producto = require("../models/Productos");
const router = express.Router();



// GET - traer todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// POST - agregar producto
router.post("/", async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// 📌 Endpoint para insertar productos de prueba
router.post("/seed", async (req, res) => {
  try {
    const productosDemo = [
      { nombre: "Laptop Gamer", descripcion: "Laptop potente para juegos", precio: 1200, imagen: "https://via.placeholder.com/150" },
      { nombre: "Smartphone", descripcion: "Teléfono de última generación", precio: 800, imagen: "https://via.placeholder.com/150" },
      { nombre: "Audífonos", descripcion: "Audífonos inalámbricos", precio: 100, imagen: "https://via.placeholder.com/150" },
      { nombre: "Monitor 4K", descripcion: "Monitor UHD para trabajar o jugar", precio: 400, imagen: "https://via.placeholder.com/150" },
      { nombre: "Teclado Mecánico", descripcion: "Teclado RGB gamer", precio: 120, imagen: "https://via.placeholder.com/150" },
      { nombre: "Mouse Gamer", descripcion: "Mouse con DPI ajustable", precio: 60, imagen: "https://via.placeholder.com/150" },
      { nombre: "Silla Gamer", descripcion: "Comodidad máxima para jugar", precio: 250, imagen: "https://via.placeholder.com/150" },
      { nombre: "Impresora WiFi", descripcion: "Imprime rápido y sin cables", precio: 150, imagen: "https://via.placeholder.com/150" }
    ];

    await Producto.insertMany(productosDemo);
    res.status(201).json({ msg: "Productos de prueba insertados 🚀" });
  } catch (error) {
    res.status(500).json({ error: "Error al insertar productos de prueba" });
  }
});


module.exports = router;
