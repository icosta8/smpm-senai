const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/SMPM')
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

const userRoutes = require("./src/routes/userRoutes");

app.use("/api/usuarios", userRoutes);

app.listen(port, () => {
  console.log('App running on port ' + port);
});
