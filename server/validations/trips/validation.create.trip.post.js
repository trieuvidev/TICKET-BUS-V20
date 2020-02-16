const { body } = require("express-validator");
const { money } = require("../../utils/regex");
const {NOTIFY} = require("../../lang/index");

const middlewareCreateTrip = [
  body("codeTrip", NOTIFY.trip_codeTrip_require).optional(),
  body("name", NOTIFY.trip_name_require)
    .optional()
    .isLength({ min: 3, max: 50 }),
  body("dateTime").optional(),
  body("fromStation").optional(),
  body("toStation").optional(),
  body("price", NOTIFY.trip_price_invalid)
    .optional()
    .matches(money)
];


module.exports = {
  middlewareCreateTrip
};
