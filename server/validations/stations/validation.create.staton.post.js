const { body } = require("express-validator");
const { phone, fullName } = require("../../utils/regex");
const {NOTIFY} = require("../../lang/index");

const middlewareCreateStation = [
  body("name", NOTIFY.station_name_invalid)
    .optional()
    .isLength({ min: 5, max: 50 }),
  body("address", NOTIFY.station_address_require)
    .optional()
    .isLength({ min: 3, max: 200 }),
  body("province", NOTIFY.station_province_invalid)
    .optional()
    .isLength({ min: 3, max: 50 })
    .matches(fullName),
  body("phone", NOTIFY.phone_invalid)
    .optional()
    .matches(phone)
];

module.exports = {
  middlewareCreateStation
};
