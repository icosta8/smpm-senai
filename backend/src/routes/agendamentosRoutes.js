const express = require("express");
const {
  listarAgendamentos,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento
} = require("../controllers/agendamentosController");

const router = express.Router();

router.get("/", listarAgendamentos);
router.post("/", criarAgendamento);
router.put("/:id", atualizarAgendamento);
router.delete("/:id", deletarAgendamento);

module.exports = router;
