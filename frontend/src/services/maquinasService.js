import { api } from "./api"; // mesmo api.js que já tem baseURL

export default {
  // cadastrar máquina
  criarMaquina(dados) {
    return api.post("/maquinas", dados);
  },

  // listar todas as máquinas
  listarMaquinas() {
    return api.get("/maquinas");
  },

  // atualizar máquina
  atualizarMaquina(id, dados) {
    return api.put(`/maquinas/${id}`, dados);
  },

  // deletar máquina
  deletarMaquina(id) {
    return api.delete(`/maquinas/${id}`);
  }
};
