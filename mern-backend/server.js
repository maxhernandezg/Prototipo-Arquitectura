const express = require('express');
const connectDB = require('./db');
const cors = require('cors');

// Importar rutas de la API
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

// Crear la aplicación de Express
const app = express();
const PORT = 5000;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes); // http://localhost:5000/api/users
app.use('/api/books', bookRoutes); // http://localhost:5000/api/books
app.use('/api/reservations', reservationRoutes); // http://localhost:5000/api/reservations

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
