const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const envioRoutes = require("./routes/envioRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes"); 

app.use("/api/auth", authRoutes);

// Usar rutas
app.use("/api/users", userRoutes);
app.use("/api/envios", envioRoutes);
app.use("/api/productos", productRoutes); 

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Servidor corriendo en http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("❌ Error al conectar a MongoDB:", err));

