const nodemailer = require("nodemailer");
const fs = require("fs-extra");
const hogan = require("hogan.js");
const keys = require("../../configs/index");

const templatePath = `${__dirname}/sendEmailBookingTemplate.hjs`;
const template = fs.readFileSync(templatePath, 'utf-8');
const compiledTemplate = hogan.compile(template);

const sendBookingTicket = (trip, ticket, account) => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTSL: true,
    requireSSL: true,
    auth: {
      account: keys.email,
      pass: keys.password
    }
  }

  const transporter = nodemailer.createTransport(transport)
  const mailOptions = {
    from: keys.email,
    to: account.email,
    subject: 'Comfirm buy ticket successfuly! ',
    html: compiledTemplate.render({
      email: account.email,
      fromStation: `${trip.fromStation.name}, ${trip.fromStation.province}`,
      toStation: `${trip.toStation.name}, ${trip.toStation.province}`,
      price: trip.price,
      amount: ticket.seats.length,
      seats: ticket.seats.map(e => e.code).toString(),
      total: ticket.seats.length * trip.price,
    })
  }
  transporter.sendMail(mailOptions, err => {
    if (err) return console.log(err.message)
    console.log("success")
  })

};

module.exports = { 
  sendBookingTicket
}