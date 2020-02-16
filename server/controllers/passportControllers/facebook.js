const JWT = require("jsonwebtoken");

const signToken = user => {
    return JWT.sign({
      iss: 'SuperDev1996',
      sub: user.id,
      iat: new Date().getTime(), 
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    }, "SuperDev1996");
  }



const facebookController = {
    facebookOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ success: true, token: token });
    },

    secret: async (req, res, next) => {
        res.status(200).json({status: 200, message: "secret resource"})
    }
}
module.exports = {facebookController, signToken};