let usuarios = [];

// REGISTRO
exports.registro = (req, res) => {
  const { nombre, correo, password } = req.body;

  const existe = usuarios.find(u => u.correo === correo);
  if (existe) {
    return res.json({ mensaje: "Usuario ya existe" });
  }

  const nuevo = { id: usuarios.length + 1, nombre, correo, password };
  usuarios.push(nuevo);

  res.json({ mensaje: "Usuario registrado", usuario: nuevo });
};

// LOGIN
exports.login = (req, res) => {
  const { correo, password } = req.body;

  const usuario = usuarios.find(
    u => u.correo === correo && u.password === password
  );

  if (!usuario) {
    return res.json({ mensaje: "Credenciales incorrectas" });
  }

  res.json({ mensaje: "Login exitoso", usuario });
};