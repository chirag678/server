import nodemailer from "nodemailer";

export const sendMail = async (email, link) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"D-REX" ${process.env.EMAIL_USERNAME}`, // sender address
    to: email, // list of receivers
    subject: "Thanks for joining our waitlist", // Subject line
    text: link, // plain text body
    html: `<b>${link}</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
