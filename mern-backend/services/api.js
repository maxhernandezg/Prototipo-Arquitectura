import axios from 'axios';

// Crear una instancia de axios para usar en toda la aplicación
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Cambia la URL si tu backend está en otro puerto
});

export default api;
