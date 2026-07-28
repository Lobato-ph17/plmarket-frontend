import axios from 'axios';

const api = axios.create({
  baseURL: 'https://plmarket-backend.onrender.com/api'
});

export default api;