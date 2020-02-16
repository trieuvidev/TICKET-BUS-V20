const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  code: { type: String, required: true },
  isBooked: { type: Boolean, default: false }, //  isAvailable = false => ghế trống >< ghế đã có người booked,
  createdAt: { type: Number, default: Date.now }
});

const Seat = mongoose.model("Seat", SeatSchema, "Seat")

module.exports = {
  SeatSchema, 
  Seat
}