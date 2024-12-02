import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.83:5000/api', // Cambia localhost si tu backend está en otra máquina o red
});

export default api;
