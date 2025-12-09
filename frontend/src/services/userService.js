import { api } from "./api";

export default {
  cadastrarUsuario(dados) {
    return api.post("/", dados); // POST /api/usuarios/
  },

  login(dados) {
    return api.post("/login", dados); // POST /api/usuarios/login
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
