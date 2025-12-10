import { defineStore } from "pinia";
import agendamentosService from "../services/agendamentosService";

export const useAgendamentosStore = defineStore("agendamentosStore", {
  state: () => ({
    agendamentos: []
  }),

  actions: {
    async carregarAgendamentos() {
      const res = await agendamentosService.listar();
      this.agendamentos = res.data; // <-- CORREÇÃO AQUI
    },

    async adicionarAgendamento(agendamento) {
      const res = await agendamentosService.criar(agendamento);
      this.agendamentos.push(res.data); // <-- CORREÇÃO AQUI
    },

    async atualizarAgendamento(id, dados) {
      const res = await agendamentosService.atualizar(id, dados);

      const index = this.agendamentos.findIndex(a => a._id === id);
      if (index !== -1) {
        this.agendamentos[index] = res.data; // <-- CORREÇÃO AQUI
      }
    },

    async deletarAgendamento(id) {
      await agendamentosService.deletar(id);
      this.agendamentos = this.agendamentos.filter(a => a._id !== id);
    }
  }
});
