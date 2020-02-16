const {middlewareCreateTrip} = require("./validation.create.trip.post");

const checkCreate = middlewareCreateTrip;

module.exports = { 
  checkCreate
}
