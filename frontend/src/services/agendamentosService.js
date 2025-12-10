import api from './api'

export default {
  async listar() {
    const response = await api.get('/agendamentos')
    return response.data
  },

  async criar(agendamento) {
    const response = await api.post('/agendamentos', agendamento)
    return response.data
  },

  async atualizar(id, agendamento) {
    const response = await api.put(`/agendamentos/${id}`, agendamento)
    return response.data
  },

  async deletar(id) {
    const response = await api.delete(`/agendamentos/${id}`)
    return response.data
  }
}
