import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia localhost si tu backend está en otra máquina o red
});

export default api;
