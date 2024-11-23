const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Definir el esquema de reserva
const reservationSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fechaReserva: { type: Date, default: Date.now },
  estadoReserva: { 
    type: String, 
    enum: ['pendiente', 'confirmado', 'cancelado'], 
    default: 'pendiente' 
  },
});
// Exportar el modelo de reserva
module.exports = mongoose.model('Reservation', reservationSchema);