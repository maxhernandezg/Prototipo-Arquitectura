const express = require('express');
const Reservation = require('../models/Reservation');
const Book = require('../models/Book');
const User = require('../models/User');
const router = express.Router();

// Crear una nueva reserva
router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las reservas con datos completos de usuario y libro
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('book', 'titulo autor')
      .populate('user', 'nombre email');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
