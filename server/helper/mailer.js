const nodemailer = require("nodemailer");
//Configuracion del node mailer
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_LOGIN,
      pass: process.env.EMAIL_PASSWORD,
    }
});

//Texto por defecto al enviar el email.
const mailer = (user,pass) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Bienvenido a la plataforma NOMBRE_PLATAFORMA";
  const html = `
  Saludos
  ${user.nombre}!, tu contraseña para entrar a la plataforma es ${pass}, por favor reinicia tu contraseña para ingresar.\n
  Atentamente el equipo de NOMBRE_PLATAFORMA.
  `;
  return { from, to, subject, html };
};
module.exports={transporter,mailer};