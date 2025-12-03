const Agendamento = require("../models/Agendamento");
const Maquina = require("../models/Maquina");

// LISTAR TODOS
async function listarAgendamentos(req, res) {
  try {
    const agendamentos = await Agendamento.find()
      .populate("maquina")
      .sort({ data: 1 });

    res.json(agendamentos);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar agendamentos" });
  }
}

// CRIAR
async function criarAgendamento(req, res) {
  try {
    const { maquina, data, responsavel, status } = req.body;

    const maquinaExiste = await Maquina.findById(maquina);
    if (!maquinaExiste) {
      return res.status(400).json({ error: "Máquina não encontrada" });
    }

    const novo = await Agendamento.create({
      maquina,
      data,
      responsavel,
      status
    });

    const resultado = await novo.populate("maquina");

    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar agendamento" });
  }
}

// ATUALIZAR
async function atualizarAgendamento(req, res) {
  try {
    const { id } = req.params;

    const atualizado = await Agendamento.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate("maquina");

    if (!atualizado) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.json(atualizado);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar agendamento" });
  }
}

// DELETAR
async function deletarAgendamento(req, res) {
  try {
    const { id } = req.params;

    const deletado = await Agendamento.findByIdAndDelete(id);

    if (!deletado) {
      return res.status(404).json({ error: "Agendamento não encontrado" });
    }

    res.json({ message: "Agendamento excluído com sucesso" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir agendamento" });
  }
}

module.exports = {
  listarAgendamentos,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento
};
