import { defineStore } from "pinia";
import userService from "../services/userService";

export const useUserStore = defineStore("user", {
  state: () => ({
    usuarios: [],
    usuarioLogado: null,
    token: null           
  }),

  actions: {
    async cadastrarUsuario(dados) {
      try {
        const response = await userService.cadastrarUsuario(dados);
        this.usuarios.push(response.data);
        return response.data;
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        throw error;
      }
    },

    async login(email, senha) {
      try {
        const response = await userService.login({ email, senha });

        // salvar token
        this.token = response.data.token;
        localStorage.setItem("token", response.data.token);

        // salvar usuário
        this.usuarioLogado = response.data.user;
        localStorage.setItem("usuario", JSON.stringify(response.data.user));

        return true;

      } catch (error) {
        console.error("Erro no login:", error);
        return false;
      }
    },

    logout() {
      this.usuarioLogado = null;
      this.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }
  }
});
