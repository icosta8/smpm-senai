import { defineStore } from "pinia";
import { apiMaquinas } from "../services/api";

export const useMaquinasStore = defineStore("maquinas", {
  state: () => ({
    maquinas: []
  }),
  actions: {
    async listar() {
      try {
        const response = await apiMaquinas.get("/");
        this.maquinas = response.data;
      } catch (error) {
        console.error("Erro ao listar máquinas:", error);
      }
    },
    async criar(dados) {
      try {
        const response = await apiMaquinas.post("/", dados);
        this.maquinas.push(response.data);
      } catch (error) {
        console.error("Erro ao criar máquina:", error);
        throw error;
      }
    },
    async atualizar(id, dados) {
      try {
        await apiMaquinas.put(`/${id}`, dados);
        await this.listar(); // Atualiza a lista
      } catch (error) {
        console.error("Erro ao atualizar máquina:", error);
        throw error;
      }
    },
    async deletar(id) {
      try {
        await apiMaquinas.delete(`/${id}`);
        await this.listar(); // Atualiza a lista
      } catch (error) {
        console.error("Erro ao deletar máquina:", error);
        throw error;
      }
    }
  }
});
