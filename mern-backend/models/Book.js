const mongoose = require('mongoose');

// Definir el esquema de libro
const bookSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true},
  categoria: { type: String, required: true },
  stock: { type: Number, required: true },
});
// Exportar el modelo de libro
module.exports = mongoose.model('Book', bookSchema);
