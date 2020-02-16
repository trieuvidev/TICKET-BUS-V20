const { validationResult, body } = require("express-validator");
const {NOTIFY} = require("../../lang/index");
const { email, password } = require("../../utils/regex");

const middlewareLoginAccount = [
  body("email", NOTIFY.email_incorrect)
    .not()
    .isEmpty()
    .matches(email),
  body("password", NOTIFY.password_incorrect)
    .isLength({ min: 8 })
    .matches(password)
];

module.exports = {
  middlewareLoginAccount
};
