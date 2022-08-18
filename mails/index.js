import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";

export const sendWelcomeMail = async (email, link) => {
  console.log("Sending welcome mail to", email);
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


  //test
  // transporter.use(
  //   "compile",
  //   hbs({
  //     viewEngine: {
  //       extName: ".handlebars",
  //       partialsDir: "./mails/views/",
  //       layoutsDir: "./mails/views/",
  //       defaultLayout: "welcome.handlebars",
  //     },
  //     viewPath: "./mails/views/",
  //   })
  // );


  const textMail = `Thank you for joining our community. We're excited to embark on this journey with you. Our talented design and engineering team is going the extra mile to make your reward even more special. We'll share the claiming page once it's live. Stay tuned!`

  const htmlMail = `<h1>Thank you for joining our community.</h1><p>Thank you for joining our community. We're excited to embark on this journey with you. Our talented design and engineering team is going the extra mile to make your reward even more special. We'll share the claiming page once it's live. Stay tuned!</p>`

  // send mail with defined transport object
  const info = transporter.sendMail({
    from: `"D-REX" ${process.env.EMAIL_USERNAME}`, // sender address
    to: email, // list of receivers
    subject: "Welcome to D-Rex", // Subject line
    text: textMail, // plain text body
    html: htmlMail, // html body
    // template: "welcome", // template - under test
  }, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};