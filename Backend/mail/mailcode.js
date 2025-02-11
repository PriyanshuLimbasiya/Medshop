
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",   auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, 
  },
});


transporter.verify((error, success) => {
  if (error) {
    console.log("Transporter verification failed ❌:", error);
  } else {
    console.log("Transporter is ready to send emails! ✉️");
  }
});


module.exports = transporter;