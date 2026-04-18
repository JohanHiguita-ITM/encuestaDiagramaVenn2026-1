const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model("Usuario", UsuarioSchema);