const nodemailer = require("nodemailer");
//Configuracion del node mailer
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "23fc7d3cc6d871",
      pass:"6d8bcd1427befb",
    }
});

//Texto por defecto al enviar el email.
const mailer = (user,pass) => {
  const from = "email@platamforma.com";
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