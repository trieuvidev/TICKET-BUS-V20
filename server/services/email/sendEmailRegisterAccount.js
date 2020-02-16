const nodemailer = require("nodemailer");


let adminEmail = "hackwagonsuperdev@gmail.com"
let adminPassword = "@ngoinhavui@";
let mailHost = "smtp.gmail.com";
let mailPort = "587";

let sendMail = (to, subject, htmlContent) => {
  let transporter = nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false, // use SSL - TLS
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });

  let options = {
    from: adminEmail,
    to: to,
    subject: "Verify account register from App VeXeRe",
    html: htmlContent
  };

  return transporter.sendMail(options) // This default return a promise
  .then(success => {
    console.log(success, "Send verify active email successfuly!")
  })
  .catch(error => {
    console.log(error, "Send verify active email false!")
  })
};

module.exports = sendMail;