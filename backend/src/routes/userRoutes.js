const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);

    const user = await User.create({
      nome,
      email,
      senha: senhaHash
    });

    res.json({
      _id: user._id,
      nome: user.nome,
      email: user.email
    });
    
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});


router.get("/", async (req, res) => {
  const users = await User.find().select("-senha");
  res.json(users);
});


router.put("/:id", async (req, res) => {
  try {
    const updates = { ...req.body };

    if (updates.senha) {
      updates.senha = await bcrypt.hash(updates.senha, 10);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    }).select("-senha");

    res.json(user);
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

router.delete("/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Usuário deletado" });
});

const jwt = require("jsonwebtoken");

// LOGIN

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

  
    const token = jwt.sign(
      { id: user._id },
      "SEGREDO_SUPER_SEGURO",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro no login" });
  }
});


module.exports = router;
