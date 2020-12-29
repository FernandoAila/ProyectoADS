const nodemailer = require("nodemailer");
var schedule = require('node-schedule');
const { Users,Reunions,Reunion_Assistants} = require("../models");


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

//Texto por defecto al enviar el email.
const reunion = (user,reu) => {
  const from = "email@platamforma.com";
  const to = user.email;
  const subject = "Recordatorio Reunion NOMBRE_PLATAFORMA";
  const html = `
  Saludos
  ${user.nombre}!, Se le recuerda que tiene una reunion agendada para el dia ${reu.date} a las ${reu.hour}:${reu.minute}.
  `;
  return { from, to, subject, html };
};

var j = schedule.scheduleJob('* * * * *', async function(){ //configurado para que mande mail todos los dias a las 7:00 AM

  console.log("entra al schedule");
  var DateComp = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
  DateComp.setDate(DateComp.getDate() + 3);
  
  //Revisa si existen reuniones programadas para 3 dias mas
  const arrReunions = await Reunions.findAll({
    where: {
      Date: DateComp
    },
   });
  
  // por cada reunion encontrada que sea en 3 dias mas
  if(arrReunions){
    for (const reu of arrReunions) {
      const arrDevReu = await Reunion_Assistants.findAll({
        where: {
          IdReu: reu.id
        },
      });
      //por cada ciatado a la reunion
      for (const dev of arrDevReu){
        var user = await Users.findOne({
          where: {
            id: dev.IdUser
          },
        });
        //envia el mail al desarrollador correspondiente
        transporter.sendMail(reunion(user,reu), function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    }
  }
});      

module.exports={transporter,mailer,asignation};