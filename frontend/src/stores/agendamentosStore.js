import { defineStore } from 'pinia'
import agendamentosService from '@/services/agendamentosService'

export const useAgendamentosStore = defineStore('agendamentosStore', {
  state: () => ({
    agendamentos: []
  }),

  actions: {
    async carregarAgendamentos() {
      this.agendamentos = await agendamentosService.listar()
    },

    async adicionarAgendamento(agendamento) {
      const novo = await agendamentosService.criar(agendamento)
      this.agendamentos.push(novo)
    },

    async atualizarAgendamento(id, dados) {
      const atualizado = await agendamentosService.atualizar(id, dados)

      const index = this.agendamentos.findIndex(a => a.id === id)
      if (index !== -1) this.agendamentos[index] = atualizado
    },

    async deletarAgendamento(id) {
      await agendamentosService.deletar(id)
      this.agendamentos = this.agendamentos.filter(a => a.id !== id)
    }
  }
})
