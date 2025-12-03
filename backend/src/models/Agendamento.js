const mongoose = require("mongoose");

const AgendamentoSchema = new mongoose.Schema(
  {
    maquina: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Maquina",
      required: true,
    },

    data: {
      type: String,
      required: true,
    },

    responsavel: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pendente", "Concluído", "Em atraso"],
      default: "Pendente",
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Agendamento", AgendamentoSchema);
