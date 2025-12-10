import { defineStore } from "pinia";
import agendamentosService from "../services/agendamentosService";

export const useAgendamentosStore = defineStore("agendamentosStore", {
  state: () => ({
    agendamentos: []
  }),

  actions: {
    async listar() {
      const res = await agendamentosService.listar();
      this.agendamentos = res.data;
    },

    async criar(agendamento) {
      const res = await agendamentosService.criar(agendamento);
      this.agendamentos.push(res.data);
    },

    async atualizar(id, dados) {
      const res = await agendamentosService.atualizar(id, dados);

      const index = this.agendamentos.findIndex(a => a._id === id);
      if (index !== -1) {
        this.agendamentos[index] = res.data;
      }
    },

    async deletar(id) {
      await agendamentosService.deletar(id);
      this.agendamentos = this.agendamentos.filter(a => a._id !== id);
    }
  }
});
