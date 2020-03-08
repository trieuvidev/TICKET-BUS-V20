const JWT = require("jsonwebtoken");
const { promisify } = require("util");
const {SECRET} = require("../configs/env.authenticate");

const verifyJwt = promisify(JWT.verify);

const authenticate = (req, res, next) => {
  const token = req.header("token");
  verifyJwt(token, SECRET) // ENV 
    .then(decoded => {
      console.log(decoded, "decoded")
      if (decoded) req.account = decoded;
      return next();
    })
    .catch(() => {
      return res.status(401).json({status: 401, message: "Authenticate is not found!"})
    });
};

// accountType = ["admin", "client"];

const authorize = accountType => {
  return (req, res, next) => {
    const errorNotification = [];
    const {account} = req;
    
    if(accountType.findIndex(elm => elm === account.accountType) > -1) return next(); // check login true false

      errorNotification.push({status: 403, message: "You don't have permission to execute!"})
      return res.status(403).json(errorNotification);
  }
};

module.exports = {
  authenticate ,authorize
}
