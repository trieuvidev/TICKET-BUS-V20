const { body } = require("express-validator");
const {NOTIFY} = require("../../lang/index");
const { email, name, phone } = require("../../utils/regex");

const middlewareBookingTicket = [
  body("emailCustomer", NOTIFY.email_incorrect)
    .not()
    .isEmpty()
    .matches(email),
  body("phoneCustomer")
    .optional()
    .matches(phone),
  body("nameCustomer", NOTIFY.full_name_invalid)
    .optional()
    .isLength({ min: 3, max: 30 })
    .matches(name)
];

module.exports = {
  middlewareBookingTicket
};