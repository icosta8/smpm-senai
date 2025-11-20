const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


router.post("/", userController.cadastrarUsuario);

router.get("/", userController.listarUsuarios);

router.put("/:id", userController.atualizarUsuario);

router.delete("/:id", userController.deletarUsuario);

router.post("/login", userController.loginUsuario);

module.exports = router;
