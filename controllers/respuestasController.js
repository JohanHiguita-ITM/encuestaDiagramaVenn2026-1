let respuestas = [];

// GUARDAR RESPUESTAS COMPLETAS
exports.guardarRespuestas = (req, res) => {
  const { usuarioId, respuestasUsuario } = req.body;

  respuestas.push({
    usuarioId,
    respuestas: respuestasUsuario
  });

  res.json({ mensaje: "Guardado correctamente" });
};

// OBTENER
exports.obtenerRespuestas = (req, res) => {
  res.json(respuestas);
};