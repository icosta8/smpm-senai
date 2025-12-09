const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./src/swagger_output.json"); 

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

// Rotas
const userRoutes = require("./src/routes/userRoutes");
app.use("/api/usuarios", userRoutes);

const maquinasRoutes = require("./src/routes/maquinasRoutes");
app.use("/api/maquinas", maquinasRoutes);

const agendamentosRoutes = require("./src/routes/agendamentosRoutes");
app.use("/api/agendamentos", agendamentosRoutes);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
  console.log(`📖 Documentação Swagger disponível em http://localhost:${port}/api-docs`);
});
