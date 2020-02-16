const mongoose = require("mongoose");
const { SeatSchema } = require("./Seat");

const TicketSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip"
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account"
  },
  seats: [SeatSchema],
  totalPrice: { type: Number, required: true },
  nameCustomer: { type: String, required: true },
  phoneCustomer: { type: String, required: true },
  emailCustomer: { type: String, require: true },
  note: { type: String, require: false },
  createdAt: { type: Number, default: Date.now }
});
const Ticket = mongoose.model("Ticket", TicketSchema, "Ticket");

module.exports = {
  Ticket,
  TicketSchema
};
