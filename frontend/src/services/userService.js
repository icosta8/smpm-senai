// services/userService.js
import { api } from "./api";

export default {
  cadastrarUsuario(dados) {
    return api.post("/", dados); // apenas "/" porque o baseURL já aponta para /api/usuarios
  },

  login(dados) {
    return api.post("/login", dados); // /login porque é relativo ao baseURL
  },

  listarUsuarios() {
    return api.get("/");
  },

  atualizarUsuario(id, dados) {
    return api.put(`/${id}`, dados);
  },

  deletarUsuario(id) {
    return api.delete(`/${id}`);
  }
};
