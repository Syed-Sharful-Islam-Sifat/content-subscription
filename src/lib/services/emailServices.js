const nodemailer = require("nodemailer");
const HttpError = require("../helpers/HttpError");
const sendEmailToUser = async ({ mailOptions }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      throw new HttpError({
        statusCode: 500,
        message: "Internal server error",
      });
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendEmailToUser,
};
