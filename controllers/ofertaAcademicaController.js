const OfertaAcademica = require('@models/ofertaAcademica');

const getAllOfertas = async (req, res) => {
  try {
    const ofertas = await OfertaAcademica.getAllOfertas()
    res.json({ ofertas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllOfertas
}