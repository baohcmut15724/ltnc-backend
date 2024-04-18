import nodeMailer from "nodemailer";
import "dotenv/config";

const mailHost = "smtp.gmail.com";
const mailPort = 587;

export const sendMail = (to, subject, htmlContent) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: process.env.adminEmail,
      pass: process.env.adminPassword,
    },
  });

  const options = {
    from: process.env.adminEmail,
    to: to,
    subject: subject,
    html: htmlContent,
  };

  return transporter.sendMail(options);
};
