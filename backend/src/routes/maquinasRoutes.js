const express = require("express");
const router = express.Router();
const maquinasController = require("../controllers/maquinasController");

// Listar
router.get("/", maquinasController.listarMaquinas);

// Criar
router.post("/", maquinasController.criarMaquina);

// Atualizar
router.put("/:id", maquinasController.atualizarMaquina);

// Deletar
router.delete("/:id", maquinasController.deletarMaquina);

module.exports = router;
