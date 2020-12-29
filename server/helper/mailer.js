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
const mailer = (user,url) => {
  const from = "email@platamforma.com";
  const to = user.email;
  const subject = "Bienvenido a la plataforma NOMBRE_PLATAFORMA";
  const html = `
  <p>Hola ${user.nombre || user.email},</p>
  <p>Para acceder a la plataforma necesitas cambiar tu contraseña con el siguiente link</p>
  <a href=${url}>${url}</a>
  <p>–Atentamente el equipo de NOMBRE_PLATAFORMA</p>
  `;
  return { from, to, subject, html };
};


const asignation=(user,module)=>{
  const from = "email@plataforma.com";
  const to = user.email;
  const subject = "Asignacion de modulo";
  const html = `
  Saludos
  ${user.nombre}!, has sido asignado al modulo ${module.nameModule}.\n
  ${module.nameModule}:\n
  ${module.descriptionModule}\n
  Atentamente el equipo de NOMBRE_PLATAFORMA.
  `;
  return { from, to, subject, html };
}
module.exports={transporter,mailer,asignation};