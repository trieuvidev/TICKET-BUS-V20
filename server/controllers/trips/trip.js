const { Trip } = require("../../model/Trip");
const { Seat } = require("../../model/Seat");
const seatCodes = require("../../services/data/listSeat");
const { NOTIFY } = require("../../lang/index");
const {validationResult} = require("express-validator");

const createTrips = async (req, res, next) => {

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
  const { codeTrip, name, fromStation, toStation, dateTime, price } = req.body;
  Trip.findOne({ codeTrip })
    .then(trip => {
      if (trip) {
        errorNotification.push({ status: 201, message: NOTIFY.trip_exist });
        return Promise.reject(errorNotification);
      }
      const newTrip = new Trip({
        codeTrip,
        name,
        fromStation,
        toStation,
        dateTime,
        price
      });
      // create seat
      seatCodes.forEach(code => {
        let newSeat = new Seat({
          code: code
        });
        newTrip.seats.push(newSeat);
      });
      newTrip.save().then(result => {
        successNotification.push({
          status: 200,
          message: NOTIFY.trip_create_success,
          CODE_TRIP: newTrip.codeTrip,
          trip: result
        });
        return res.status(200).json(successNotification);
      });
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

const getTrips = (req, res, next) => {
  const successNotification = [];
  Trip.find()
    .then(trips => {
      successNotification.push({
        status: 200,
        message: NOTIFY.trip_find_success,
        trips: trips
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

const getTripById = (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { id } = req.params;
  Trip.findById(id)
    .then(trip => {
      if (!trip) {
        errorNotification.push({ status: 404, message: NOTIFY.trip_not_found });
        return Promise.reject(errorNotification);
      }
      successNotification.push({
        status: 200,
        message: NOTIFY.trip_find_success,
        trip: trip
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

const updateTrip = (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { name, fromStation, toStation, dateTime, price } = req.body;
  const { id } = req.params;
  Trip.findById(id)
    .then(trip => {
      if (!trip) {
        errorNotification.push({ status: 404, message: NOTIFY.trip_not_found });
        return Promise.reject(errorNotification);
      }
      trip.name = name;
      trip.fromStation = fromStation;
      trip.toStation = toStation;
      trip.dateTime = dateTime;
      trip.price = price;
      trip.save();
      successNotification.push({
        status: 200,
        message: NOTIFY.trip_update_success,
        TRIP_UPDATE: trip
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

const deleteTrip = (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { id } = req.params;
  Trip.findById(id)
    .then(trip => {
      if (!trip) {
        errorNotification.push({ status: 404, message: "Trip not found!" });
        return Promise.reject(errorNotification);
      }
      trip.deleteOne();
      successNotification.push({
        status: 200,
        message: `Delete trip id: ${id} successfuly!`,
        deleteTrip: trip
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

module.exports = {
  createTrips,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip
};
