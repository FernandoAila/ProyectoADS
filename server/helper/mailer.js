const nodemailer = require("nodemailer");
var schedule = require('node-schedule');


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

//Texto por defecto al enviar el email.
const reunion = (user,pass) => {
  const from = "email@platamforma.com";
  const to = user.email;
  const subject = "Recordatorio Reunion NOMBRE_PLATAFORMA";
  const html = `
  Saludos
  ${user.nombre}!, Se le recuerda que tiene una reunion agendada para el dia ${reunion.fecha} a las ${hora}.
  `;
  return { from, to, subject, html };
};

schedule.schedule('0 7 * * *', () => { //configurado para que mande mail todos los dias a las 7:00 AM
  // Send e-mail 



  transporter.sendMail(reunion(user,fecha,hora), function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
  });

module.exports={transporter,mailer,asignation};