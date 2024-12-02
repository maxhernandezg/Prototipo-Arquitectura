const express = require('express');
const Reservation = require('../models/Reservation');
const Book = require('../models/Book');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

// Crear una nueva reserva
router.post('/', async (req, res) => {
    try {
        const { book, user } = req.body;

        // Validar que book y user sean ObjectId válidos
        if (!mongoose.Types.ObjectId.isValid(book) || !mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: 'El ID del libro o usuario no es válido' });
        }

        // Verificar que ambos existan en la base de datos
        const bookExists = await Book.findById(book);
        const userExists = await User.findById(user);

        if (!bookExists || !userExists) {
            return res.status(404).json({ message: 'Libro o usuario no encontrado' });
        }

        const reservation = new Reservation({ book, user });
        await reservation.save();
        res.status(201).json({ success: true, reservation });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});



// Obtener todas las reservas con datos completos de usuario y libro
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('book', 'titulo') // Asegúrate de que 'titulo' es el campo correcto en el modelo Book
      .populate('user', 'nombre email');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
