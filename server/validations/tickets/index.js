const {middlewareBookingTicket} = require('./validation.booking.ticket.post');

const checkCustomerBooking = middlewareBookingTicket;

module.exports = {checkCustomerBooking};