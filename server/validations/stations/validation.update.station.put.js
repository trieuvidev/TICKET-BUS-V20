const { validationResult, body } = require("express-validator");
const { phone, fullName } = require("../../utils/regex");
const {NOTIFY} = require("../../lang/index");

const middlewareUpdateStation = [
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

const validateUpdateStation = async (req, res, next) => {
  const listErrorValidations = [];
  const errors = validationResult(req);
  const { name, address, province, phone } = req.body;
  // * Validate Name */
  if (!name) listErrorValidations.push({ name: NOTIFY.station_name_require });
  if (!address)
    listErrorValidations.push({ address: NOTIFY.station_address_require });
  if (!province)
    listErrorValidations.push({ province: NOTIFY.station_address_require });
  if (!phone) {
    listErrorValidations.push({ phone: NOTIFY.phone_require });
  } else {
    return next();
  }

  errors
    .array()
    .map(err => listErrorValidations.push({ [err.param]: err.msg }));
  return res.status(422).json({ errors: listErrorValidations });
};

module.exports = {
  middlewareUpdateStation,
  validateUpdateStation
};
