import { defineStore } from "pinia";
import axios from "axios";

const API = "https://SEU-BACKEND.onrender.com/api/agendamentos";

export const useAgendamentosStore = defineStore("agendamentosStore", {
  state: () => ({
    agendamentos: [],
  }),

  actions: {
    // Listar
    async listar() {
      try {
        const res = await axios.get(API);
        this.agendamentos = res.data;
      } catch (err) {
        console.error("Erro ao listar agendamentos:", err);
      }
    },

    // Criar
    async criar(agendamento) {
      try {
        const res = await axios.post(API, agendamento);
        this.agendamentos.push(res.data);
      } catch (err) {
        console.error("Erro ao criar agendamento:", err);
      }
    },

    // Atualizar
    async atualizar(id, dados) {
      try {
        const res = await axios.put(`${API}/${id}`, dados);

        const index = this.agendamentos.findIndex(a => a._id === id);
        if (index !== -1) {
          this.agendamentos[index] = res.data;
        }
      } catch (err) {
        console.error("Erro ao atualizar agendamento:", err);
      }
    },

    // Deletar
    async deletar(id) {
      try {
        await axios.delete(`${API}/${id}`);
        this.agendamentos = this.agendamentos.filter(a => a._id !== id);
      } catch (err) {
        console.error("Erro ao deletar agendamento:", err);
      }
    }
  }
});
