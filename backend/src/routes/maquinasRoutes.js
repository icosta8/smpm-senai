const express = require("express");
const router = express.Router();
const maquinasController = require("../controllers/maquinasController");

router.get("/", maquinasController.listarMaquinas);

router.post("/", maquinasController.criarMaquina);

router.put("/:id", maquinasController.atualizarMaquina);

router.delete("/:id", maquinasController.deletarMaquina);

module.exports = router;
