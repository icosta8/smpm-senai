import { apiAgendamentos } from "./api";

export default {
  listar() {
    return apiAgendamentos.get("/");
  },

  criar(dados) {
    return apiAgendamentos.post("/", dados);
  },

  atualizar(id, dados) {
    return apiAgendamentos.put(`/${id}`, dados);
  },

  deletar(id) {
    return apiAgendamentos.delete(`/${id}`);
  }
};
