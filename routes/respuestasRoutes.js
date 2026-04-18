const express = require("express");
const router = express.Router();
const {
  guardarRespuestas,
  obtenerRespuestas
} = require("../controllers/respuestasController");

router.post("/", guardarRespuestas);
router.get("/", obtenerRespuestas);

module.exports = router;