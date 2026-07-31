// src/services/produtoService.js
import  api  from './api';

export const produtoService = {
  listarTodos: async (pagina = 0, tamanho = 6) => {
    const response = await api.get(`/produtos?page=${pagina}&size=${tamanho}`);
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