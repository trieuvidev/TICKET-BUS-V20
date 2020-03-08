const JWT = require("jsonwebtoken");
const { promisify } = require("util");

/**
 *
 * @param {data user} payload
 * @param {secret key env} secretKey
 * @param {line Token} expiIn
 */
const jwtSign = promisify(JWT.sign);
const jwtVerify = promisify(JWT.verify);

const generateToken = (user, secretSignature , tokenLine) => {
  //
  const payloadUser = {
    _id: user._id,
    email: user.email,
    accountType: user.accountType,
    fullName: user.fullName
  };
  
 return jwtSign(payloadUser, secretSignature , tokenLine)
 .then(token => { 
   return Promise.resolve(token);
 })
 .catch(error => { 
   return Promise.reject({error: "Invalid token"})
 })
};

const verifyToken = (token, secretKey) => {
  return jwtVerify(token, secretKey, (error, decoded) => { 
    if(error) { 
      Promise.reject({error: "error"});
    }
    console.log(decoded, "decoded")
    return Promise.resolve(decoded)
  })
};

module.exports = {
  generateToken,
  verifyToken
};
