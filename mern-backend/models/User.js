const mongoose = require('mongoose');

// Definir el esquema de usuario
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tipoUsuario: { type: String, required: true },
});
// Exportar el modelo de usuario
module.exports = mongoose.model('User', userSchema);
