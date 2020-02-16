const express = require("express");
const ticketController = require("./ticket");
const {authenticate} = require("../../middlewares/authenticate");
const {checkCustomerBooking} = require("../../validations/tickets/index");

const router = express.Router();

router.post("/ticket/booking",authenticate, checkCustomerBooking ,ticketController.bookingTickets)

module.exports = router;
