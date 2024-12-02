const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Ruta para obtener todos los usuarios en la ruta /api/users
router.get('/', async (req, res) => {
  try {
    const users = await User.find(); // Busca todos los usuarios en la base de datos
    res.json(users); // Devuelve los usuarios en formato JSON
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener los usuarios' });
  }
});

// Función para crear un usuario en la ruta 
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body); // Crear un usuario con los datos enviados
    await user.save(); // Guardar en MongoDB
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Función para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca el usuario por email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }

    // Verifica la contraseña (esto supone que tienes contraseñas en texto plano, para más seguridad usa bcrypt)
    if (password !== user.password) { // Nota: usa bcrypt para producción y no texto plano como aquí :) 
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }

    // Respuesta exitosa
    res.json({ success: true, message: 'Login exitoso', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

module.exports = router;
