import axios from 'axios';

const api = axios.create({
  baseURL: 'https://plmarket-backend.onrender.com'
});

export default api;