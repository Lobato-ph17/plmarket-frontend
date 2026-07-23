import api from './api';

export const produtoService = {
  listarTodos: async () => {
    const response = await api.get('/produtos');
    return response.data;
  },

  criar: async (produto) => {
    const response = await api.post('/produtos', produto);
    return response.data;
  },

  atualizar: async (id, produto) => {
    const response = await api.put(`/produtos/${id}`, produto);
    return response.data;
  },

  deletar: async (id) => {
    await api.delete(`/produtos/${id}`);
  }
};