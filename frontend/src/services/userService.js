import { api } from "./api";

export default {
  criarUsuario(dados) {
    return api.post("/", dados);
  }
};