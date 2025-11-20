const mongoose = require("mongoose");

const maquinaSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  modelo: {
    type: String,
    required: true,
    enum: ["Pneumática", "Hidráulica", "Elétrica", "CNC", "Convencional", "Robótica"]
  },
  numeroSerie: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ["Ativa", "Em manutenção", "Inativa"],
    default: "Ativa"
  }
});

const Maquina = mongoose.model("Maquina", maquinaSchema);

module.exports = Maquina;
