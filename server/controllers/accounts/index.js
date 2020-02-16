const express = require("express");
const accountController = require("./accounts");
const {authenticate, authorize} = require("../../middlewares/authenticate");
const {checkRegister, checkLogin, checkUpdate} = require("../../validations/accounts/index");
const {initPassportFacebook} = require("../passportControllers/passport");
const {facebookController} = require("../passportControllers/facebook");
const passport = require("passport");
const router = express.Router();


const passportJWT = passport.authenticate('jwt', { session: false });
initPassportFacebook()

router.post("/account/sign-up",checkRegister, accountController.createAccounts);
router.get("/account/verify/:token", accountController.verifyActiveAccount);
router.post("/account/login-user", checkLogin ,accountController.loginAccount);
router.post("/account/login-admin", checkLogin ,accountController.loginAdmin);
router.put("/account/:id",authenticate, authorize(["admin"]), checkUpdate ,  accountController.updateAccount);
router.get("/accounts",authenticate, authorize(["admin"]), accountController.findAccounts);
router.get("/account/:id",authenticate,authorize(["admin"]) ,accountController.findAccountById);
router.delete("/account/:id",authenticate, authorize(["admin"]) , accountController.deleteAccount);

// Facebook 
router.post("/auth-facebook/token", passport.authenticate("facebookToken", {session: false}), facebookController.facebookOAuth)
router.get("/auth-facebook/secret",passportJWT, facebookController.secret)



module.exports = router;