import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Substitua pela URL da sua API
});

export default api;