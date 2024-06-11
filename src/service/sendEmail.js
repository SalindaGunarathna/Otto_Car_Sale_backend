const { body } = require("express-validator");
const nodemailer = require("nodemailer");
require("dotenv").config();
const createHttpError = require("http-errors");


const sendEmail = async (emailAddress,Subject ,text)=>{
    const recieverEmail = emailAddress;
    const body = text;
    const subject = Subject;
    const password = process.env.PASSWORD;
    const SenderEmail = process.env.EMAIL;
    try {

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SenderEmail,
          pass: password,
        },
      });
  
      var mailOptions = {
        from: SenderEmail,
        to: recieverEmail,
        subject: subject,
        text: body,
      };
  
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          
        }
      });
  
      
    } catch (error) {
        throw createHttpError(400, error);
    }

};


module.exports = sendEmail