const express = require("express");
const cors = require("cors");
const conectarDB = require("./config/db");

const app = express();

// 🔥 Conectar a la base de datos
// conectarDB();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Rutas
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/respuestas", require("./routes/respuestasRoutes"));

// 🔹 Ruta de prueba (para saber si el servidor está vivo)
app.get("/", (req, res) => {
  res.send("Servidor funcionando 🚀");
});

// 🔹 Puerto
const PORT = 3000;

// 🔹 Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});