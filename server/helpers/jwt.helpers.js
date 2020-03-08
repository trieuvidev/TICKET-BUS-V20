const JWT = require("jsonwebtoken");
const { promisify } = require("util");
const {SECRET, EXPRIRES_IN} = require("../configs/env.authenticate");

/**
 *
 * @param {data user} payload
 * @param {secret key env} secretKey
 * @param {line Token} expiIn
 */
const jwtSign = promisify(JWT.sign);

const generateToken = (user, secretKey, tokenLine) => {
  //
  const payloadUser = {
    _id: user._id,
    email: user.email,
    accountType: user.accountType,
    fullName: user.fullName
  };
  
 return jwtSign(payloadUser, secretKey, tokenLine)
 .then(token => { 
   return Promise.resolve(token);
 })
 .catch(error => { 
   return Promise.reject({error: "Invalid token"})
 })
};

const verifyToken = (token, secretKey) => {};

module.exports = {
  generateToken,
  verifyToken
};
