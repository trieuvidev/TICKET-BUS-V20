const {middlewareAccount} = require("./validation.register.account.post");
const {middlewareLoginAccount} = require("./validation.login.account.post");
const {middlewareUpdateAccount} = require("./validation.update.account.put");

const checkRegister = middlewareAccount;
const checkLogin = middlewareLoginAccount;
const checkUpdate = middlewareUpdateAccount;

module.exports = { 
  checkRegister, checkLogin, checkUpdate
}