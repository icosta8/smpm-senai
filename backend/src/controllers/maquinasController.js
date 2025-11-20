const Maquina = require("../models/Maquina");

exports.listarMaquinas = async (req, res) => {
  try {
    const maquinas = await Maquina.find();
    res.json(maquinas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar máquinas" });
  }
};

exports.criarMaquina = async (req, res) => {
  try {
    const { nome, modelo, numeroSerie, status } = req.body;
    const maquina = await Maquina.create({ nome, modelo, numeroSerie, status });
    res.json(maquina);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar máquina" });
  }
};

exports.atualizarMaquina = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, modelo, numeroSerie, status } = req.body;
    const maquinaAtualizada = await Maquina.findByIdAndUpdate(
      id,
      { nome, modelo, numeroSerie, status },
      { new: true }
    );
    res.json(maquinaAtualizada);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar máquina" });
  }
};

exports.deletarMaquina = async (req, res) => {
  try {
    const { id } = req.params;
    await Maquina.findByIdAndDelete(id);
    res.json({ message: "Máquina deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar máquina" });
  }
};
