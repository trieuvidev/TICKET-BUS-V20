const { Ticket } = require("../../model/Ticket");
const { Trip } = require("../../model/Trip");
const {sendBookingTicket} = require("../../services/email/sendEmailBooking");

const bookingTickets = (req, res, next) => {

  const listErrorValidations = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors
      .array()
      .map(err => listErrorValidations.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: listErrorValidations});
  }



  const errorNotification = [];
  const successNotification = [];
  const accountId = req.account.accountId; // token payload

  const { tripId, seatCodes, nameCustomer, phoneCustomer, emailCustomer, note} = req.body;
  

  Trip.findById(tripId)
    .populate("fromStation")
    .populate("toStation")
    .then(trip => {
      if (!trip) {
        errorNotification.push({ status: 404, message: "Trip not found!" });
        return Promise.reject(errorNotification);
      }
      // check whether or not the seat is set if !isBooked then push seat in errorSeatCodes
      const availableSeatCodes = trip.seats
        .filter(seats => !seats.isBooked)
        .map(seats => seats.code);

      let errorSeatCodes = [];

      seatCodes.forEach(code => {
        if (availableSeatCodes.indexOf(code) === -1) errorSeatCodes.push(code);
      });

      if (errorSeatCodes.length > 0) {
        errorNotification.push({
          status: 400,
          message: "Seats are not available!",
          notAvailableSeats: errorSeatCodes
        });
        return Promise.reject(errorNotification)
      }
      // create ticket
      const newTicket = new Ticket({
        tripId,
        accountId,
        seats: seatCodes.map(seat => ({
          isBooked: true,
          code: seat
        })),
        totalPrice: trip.price * seatCodes.length,
        nameCustomer , 
        phoneCustomer,
        emailCustomer,
        note
      });

      console.log(newTicket)

      trip.seats = trip.seats.map(seat => {
        if (seatCodes.indexOf(seat.code) > -1) {
          seat.isBooked = true;
        }
        return seat;
      });

      return Promise.all([newTicket.save(), trip.save()]);
    })
    .then(result => {
      //  sendBookingTicket(result[0], result[1], req.account);
      successNotification.push({
        status: 200,
        message: "Booking ticket successfuly!",
        ticket: result[0]
      });
     
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      console.log(err);
      
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

module.exports = {
  bookingTickets
};
