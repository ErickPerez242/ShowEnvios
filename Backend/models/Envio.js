const mongoose = require("mongoose");

const EnvioSchema = new mongoose.Schema(
  {
    destinatario: {
      type: String,
      required: [true, "El destinatario es obligatorio"],
      trim: true,
    },
    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      trim: true,
    },
    producto: {
      type: String,
      required: [true, "El producto es obligatorio"],
      trim: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "en camino", "entregado"],
      default: "pendiente",
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // referencia al modelo User
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Envio", EnvioSchema);




