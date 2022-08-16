import nodemailer from "nodemailer";

export const sendWelcomeMail = async (email, link) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    }
  });

  const textMail = `Thank you for joining our community. We're excited to embark on this journey with you. Our talented design and engineering team is going the extra mile to make your reward even more special. We'll share the claiming page once it's live. Stay tuned!`

  const htmlMail = `<h1>Thank you for joining our community.</h1><p>Thank you for joining our community. We're excited to embark on this journey with you. Our talented design and engineering team is going the extra mile to make your reward even more special. We'll share the claiming page once it's live. Stay tuned!</p>`

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `"D-REX" ${process.env.EMAIL_USERNAME}`, // sender address
    to: email, // list of receivers
    subject: "Welcome to D-Rex", // Subject line
    text: textMail, // plain text body
    html: htmlMail, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
