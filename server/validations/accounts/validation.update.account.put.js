const { body } = require("express-validator");
const {NOTIFY} = require("../../lang/index");
const { email, password, name, phone } = require("../../utils/regex");

const middlewareUpdateAccount = [
  body("email", NOTIFY.email_not_update)
    .not()
    .isEmpty()
    .matches(email),
  body("password", NOTIFY.password_incorrect)
    .isLength({ min: 8 })
    .matches(password),
  body("fullName", NOTIFY.full_name_invalid)
    .optional()
    .isLength({ min: 3, max: 30 })
    .matches(name),
  body("phone", NOTIFY.phone_invalid)
    .optional()
    .matches(phone)
];

module.exports = {
  middlewareUpdateAccount
};
