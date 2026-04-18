const mongoose = require("mongoose");

const conectarDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/vennDB");
    console.log("Base de datos conectada");
  } catch (error) {
    console.log("Error BD:", error);
  }
};

module.exports = conectarDB;