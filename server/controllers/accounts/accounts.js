const { Account } = require("../../model/Account");
const { promisify } = require("util");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NOTIFY, NOTIFY_MAIL } = require("../../lang/index");
const uuidv4 = require("uuid/v4");
const sendMail = require("../../services/email/sendEmailRegisterAccount");
const { validationResult } = require('express-validator');


const createAccounts = (req, res, next) => {
  const listErrorValidations = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // array errors
    errors
      .array()
      .map(err => listErrorValidations.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: listErrorValidations });
  }

  const { email, password, phone, fullName } = req.body;
  const protocol = req.protocol;
  const host = req.get("host");
  const errorNotification = [];
  const successNotification = [];
  Account.findOne({ email })
    .then(account => {
      if (account) {
        errorNotification.push({ status: 201, message: "Account is exist!" });
        return Promise.reject(errorNotification);
      }
      if (!validator.equals(req.body.password, req.body.confirmPassword)) 
    {
      errorNotification.push({status: 403, password: NOTIFY.password_match });
      return Promise.reject(errorNotification);
    }
      const newAccount = new Account({
        email,
        password,
        phone,
        fullName,
        verifyToken: uuidv4()
      });
      newAccount.save().then(async account => {
        const linkVerify = `${protocol}://${host}/api/account/verify/${account.verifyToken}`;
        await sendMail(email, NOTIFY_MAIL.subject(email), NOTIFY_MAIL.tempale(linkVerify));
        successNotification.push({
          status: 200,
          message: "Register account successfuly! Please check email register",
          account: account
        });
        return res.status(200).json(successNotification);
      });
    })
    .catch(err => {
      if (err.status) {
        return res.status(res.status).json(errorNotification);
      }
      return res.status(500).json(err);
    });
};

//** Verify Token */
const verifyActiveAccount = (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { token } = req.params;
  Account.findOne({ verifyToken: token })
    .then(account => {
      if (!account) {
        errorNotification.push({ status: 404, message: NOTIFY.token_delete_verify })
        return Promise.reject(errorNotification)
      }
      // active true
      account.isActive = true;
      account.save()
        .then(user => {
          successNotification.push({ status: 200, message: `Active email ${account.email} successfuly! Have nice a day ^^`, account: user })
          return res.status(200).json(successNotification);
        })
    })
    .catch(err => {
      if (err.status) {
        return res.status(res.status).json(errorNotification);
      }
      return res.status(500).json(err);
    })
}

//** Login Account */
const comparePassword = promisify(bcrypt.compare);
const jwtSign = promisify(jwt.sign);

const loginAccount = async(req, res, next) => {
  const listErrorValidations = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if(!errors.email) listErrorValidations.push({email: NOTIFY.email_require});
    if(!errors.password) listErrorValidations.push({password: NOTIFY.password_require})
    errors
      .array()
      .map(err => listErrorValidations.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: listErrorValidations });
  }


  const errorNotification = [];
  const successNotification = [];
  const { email, password } = req.body;

  Account.findOne({ email })
    .then(account => {
      if (!account) {
        errorNotification.push({
          status: 404,
          message: NOTIFY.account_not_found
        });
        return Promise.reject(errorNotification);
      } else if (!account.isActive) {
        errorNotification.push({
          status: 404,
          message: "Account is not active! Please check email register!"
        });
        return Promise.reject(errorNotification);
      } else { 
        if(account.accountType === "admin") { 
          return Promise.reject("dang nhap khong hop le")
        }
      }
      return Promise.all([
        comparePassword(password, account.password),
        account
      ]);
    })
    .then(res => {
      const [isMatch, account] = res; // isMatch:  if compare passowrd success
      errorNotification.push({
        status: 404,
        message: NOTIFY.account_login_fail
      });
      if (!isMatch) return Promise.reject(errorNotification);
      // create payload
      const payload = {
        email: account.email,
        accountType: account.accountType,
        accountId: account._id,
        fullName: account.fullName
      };
      return jwtSign(payload, "TrieuViDevDepTrai@1996", { expiresIn: 3600 });
    })
    .then(token => {
      successNotification.push({
        status: 200,
        message: NOTIFY.account_login_success,
        token: token
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};


const loginAdmin = async(req, res, next) => {
  const listErrorValidations = [];
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    if(!errors.email) listErrorValidations.push({email: NOTIFY.email_require});
    if(!errors.password) listErrorValidations.push({password: NOTIFY.password_require})
    errors
      .array()
      .map(err => listErrorValidations.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: listErrorValidations });
  }


  const errorNotification = [];
  const successNotification = [];
  const { email, password } = req.body;

  Account.findOne({ email })
    .then(account => {
      if (!account) {
        errorNotification.push({
          status: 404,
          message: NOTIFY.account_not_found
        });
        return Promise.reject(errorNotification);
      } else if (!account.isActive) {
        errorNotification.push({
          status: 404,
          message: "Account is not active! Please check email register!"
        });
        return Promise.reject(errorNotification);
      } else { 
        if(account.accountType === "client") { 
          return Promise.reject("Login faild")
        }
      }
      return Promise.all([
        comparePassword(password, account.password),
        account
      ]);
    })
    .then(res => {
      const [isMatch, account] = res; // isMatch:  if compare passowrd success
      errorNotification.push({
        status: 404,
        message: NOTIFY.account_login_fail
      });
      if (!isMatch) return Promise.reject(errorNotification);
      // create payload
      const payload = {
        email: account.email,
        accountType: account.accountType,
        accountId: account._id,
        fullName: account.fullName
      };
      return jwtSign(payload, "TrieuViDevDepTrai@1996", { expiresIn: 3600 });
    })
    .then(token => {
      successNotification.push({
        status: 200,
        message: NOTIFY.account_login_success,
        token: token
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

const findAccounts = async (req, res, next) => {
  const successNotification = [];

  Account.find()
    .then(accounts => {
      successNotification.push({
        status: 200,
        message: NOTIFY.account_find_list_success,
        accounts: accounts
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
};

const findAccountById = async (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { id } = req.params;
  Account.findById(id)
    .then(account => {
      if (!account) {
        errorNotification.push({
          status: 404,
          message: NOTIFY.account_not_found
        });
        return Promise.reject(errorNotification);
      }
      successNotification.push({
        status: 200,
        message: NOTIFY.account_find_success,
        account: account
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      return res.status(500).json(err);
    });
};

const updateAccount =async (req, res, next) => {
  const listErrorValidations = [];
  const errors = validationResult(req);
  let user = await Account.findById(req.params.id)
  if (!errors.isEmpty()) {
    if(!req.body.email !== user.email) listErrorValidations.push({email: NOTIFY.email_not_update })

    errors
      .array()
      .map(err => listErrorValidations.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: listErrorValidations});
  }

    const errorNotification = [];
    const successNotification = [];
    const { id } = req.params;
    const { password, fullName, phone } = req.body;
  
    Account.findById(id)
      .then(account => {
        if (!account) {
          errorNotification.push({
            status: 404,
            message: NOTIFY.account_not_found
          });
          return Promise.reject(errorNotification);
        }
        return Promise.all([
          comparePassword(password, account.password),
          account,
          password,
          fullName,
          phone
        ]);
      })
      .then(result => {
        const [isMatchPassword, account, password, fullName, phone] = result;
        if (isMatchPassword) {
          errorNotification.push({
            status: 422,
            message: NOTIFY.nofify_update_password
          });
          return Promise.reject(errorNotification);
        } else {
          // =>  update
          account.fullName = fullName;
          account.phone = phone;
          account.password = password;
          account.createdAt = Date.now();
          account.save().then(account => {
            successNotification.push({
              status: 200,
              message: NOTIFY.notify_update_successfuly,
              account: account
            });
            return res.status(200).json(successNotification);
          });
        }
      })
      .catch(err => {
        if (err.status) return res.status(err.status).json(errorNotification);
        return res.status(500).json(err);
      });

};

const deleteAccount = (req, res, next) => {
  const errorNotification = [];
  const successNotification = [];
  const { id } = req.params;
  Account.findById(id)
    .then(account => {
      if (!account) {
        errorNotification.push({
          status: 404,
          message: NOTIFY.account_not_found
        });
        return Promise.reject(errorNotification);
      }
      account.deleteOne();
      successNotification.push({
        status: 200,
        message: NOTIFY.account_delete_success,
        deleteAccount: account
      });
      return res.status(200).json(successNotification);
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json(errorNotification);
      else if (err.isEmpty()) {

      }
      return res.status(500).json(err);
    });
};

module.exports = {
  loginAdmin,
  createAccounts,
  findAccounts,
  findAccountById,
  loginAccount,
  updateAccount,
  deleteAccount,
  verifyActiveAccount
};