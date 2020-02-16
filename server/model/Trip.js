const mongoose = require('mongoose');
const { SeatSchema } = require("./Seat");

const TripSchema = new mongoose.Schema({
  codeTrip: {type: String, required: true},
  name: {type: String, required: true},
  fromStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  },
  toStation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  },
  dateTime: { type: String, required: true },
  seats: [SeatSchema],
  price: { type: String, required: true },
  createdAt: { type: Number, default: Date.now }
})
const Trip = mongoose.model('Trip', TripSchema, 'Trip')

module.exports = {
  Trip, TripSchema
}