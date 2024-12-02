import axios from 'axios';

// Crear una instancia de axios para usar en toda la aplicación
const api = axios.create({
  baseURL: 'http://192.168.1.83:5000/api', // Cambia la URL si tu backend está en otro puerto
});

export default api;
