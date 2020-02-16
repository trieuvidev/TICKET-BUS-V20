const FacebookTokenStrategy = require("passport-facebook-token");
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { Account } = require("../../model/Account");
require("dotenv").config();

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: "SuperDev1996"
}, async (payload, done) => {
    try {
        // Find the user specified in token
        const user = await Facebook.findById(payload.sub);
        // If user doesn't exists, handle it
        if (!user) {
            return done(null, false);
        }
        // Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));


const cookieExtractor = (req, res, next) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['access_token'];
    }
    return token;
}


let CLIENT_ID = "1455139371311416";
let CLIENT_CECRET = "71251718eff1d45f02a7cff226167cf7";

const initPassportFacebook = () => {
    passport.use('facebookToken', new FacebookTokenStrategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_CECRET,
    }, async (accessToken, refreshToken, profile, done) => {
        console.log(profile, "profile")
        try {
            const account = await Account.findOne({ "facebook.uid": profile.id });
            if (account) {
                return done(null, account);
              } 
            //   else { 
                const newAccount = new Account({
                    facebook: {
                        method: "facebook",
                        uid: profile.id,
                        email: profile.emails[0].value,
                    }
                })
                await newAccount.save();
                return done(null, newAccount)
            // }
        } catch (error) {
            return done(error, false, error.message)
        }
    }))
};

module.exports = { initPassportFacebook, cookieExtractor };