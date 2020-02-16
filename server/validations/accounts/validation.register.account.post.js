const { body } = require("express-validator");
const validator = require("validator");
const {NOTIFY} = require("../../lang/index");
const { email, password, phone, fullName } = require("../../utils/regex");

const middlewareAccount = [
  body("email", NOTIFY.email_incorrect)
    .not()
    .isEmpty()
    .matches(email),
  body("password", NOTIFY.password_incorrect)
    .isLength({ min: 8 })
    .matches(password),
  body("fullName", NOTIFY.full_name_invalid)
    .optional()
    .isLength({ min: 3, max: 30 })
    .matches(fullName),
  body("phone", NOTIFY.phone_invalid)
    .optional()
    .matches(phone)
];

module.exports = {
  middlewareAccount
};
