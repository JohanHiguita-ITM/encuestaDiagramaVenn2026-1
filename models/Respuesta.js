const mongoose = require("mongoose");

const RespuestaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  respuestas: [String]
});

module.exports = mongoose.model("Respuesta", RespuestaSchema);