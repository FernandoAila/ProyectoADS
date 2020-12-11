const router = require("express").Router();
const { Users,rols,users_rols } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authFunc = require("../helper/verifyToken");
//Recoge los datos del usuario logeado
router.get("/profile",async (req,res)=>{
    try {
        let data=jwt.verify(req.header("token"), process.env.SECRET_TOKEN);
        if (!data) return res.status(401).send("no tienes autorizado entrar");
        const user = await Users.findOne({
            where: {
              id: data.id,
            },
          });
        return res.send({email:user.email,nombre:user.nombre,apellido:user.apellido,telefono:user.telefono});
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.post("/modify",async (req,res)=>{
    try {
      let data=jwt.verify(req.body.token, process.env.SECRET_TOKEN);
      const user = await Users.findOne({
        where: {
          id: data.id,
        },
      });
      const validpass= await bcrypt.compare(req.body.oldpassword,user.password);
      if(!validpass){
        return res.status(401).send({message:"contraseña incorrecta"});
      }
      await Users.update({ nombre:req.body.nombre, apellido:req.body.apellido, 
        email:req.body.email, telefono:req.body.telefono }, {
        where: {
          id:data.id 
        }
      });
      return res.status(200).send("ok")
    } catch (error) {
      return res.send(error);
    }


});
router.post("/passUpdate",async (req,res)=>{
  try {
      let data=jwt.verify(req.body.token, process.env.SECRET_TOKEN);
      const user = await Users.findOne({
          where: {
            id: data.id,
          },
        });
        const validPass = await bcrypt.compare(req.body.oldpassword, user.password);
        if (!validPass) return res.status(401).send({message:"constraseña antigua incorrecta"});

        //hasheo nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.newpassword, salt);    
        
        await Users.update({
          password:hashPass,
        },{
          where: {
            id: data.id,
          },
        });
      return res.status(200).send({message:"Cambio de contraseña realizado correctamente"});
  } catch (err) {
      return res.status(400).send(err);
  }
});


//Devuelve a los Dessarrolladores internos
router.get("/AllInterns",async (req,res)=>{
  try {
      //Busca todos los desarrolladores en la tabla users_rols
      const internsId = await users_rols.findAll({
          where: {
            rolsId: 3
          },
          raw : true,
      });
      console.log(internsId);
      let arrIntern=[];
      //Busca todos los usuarios que sea desarrolladores internos
      for(const internsRols of internsId){
        console.log(internsRols.userId)
        const intern = await Users.findOne({
          where: {
            id: internsRols.userId
          },
          raw : true,
        }).catch((err)=>console.log(err))
        arrIntern.push(intern)
      }
      console.log(arrIntern);
      return res.send(arrIntern);
  } catch (err) {
      return res.status(400).send(err);
  }
});

//Devuelve a los Freelance que postulador a un modulo dado
router.get("/AllFree",async (req,res)=>{
  try {
      //Busca todos los desarrolladores en la tabla users_rols
      const internsId = await Users_Rols.findAll({
          where: {
            rolsId: 3
          }
      });
      var arrIntern;
      //Busca todos los usuarios que sea desarrolladores internos
      for(const internsRols of internsId){
        console.log(interns)
        const intern = await Users.findOne({
          where: {
            id: internsRols.userId
          }
        });
        arrIntern.push({intern})
      }

      return res.send(arrIntern);
  } catch (err) {
      return res.status(400).send(err);
  }
});

module.exports = router;