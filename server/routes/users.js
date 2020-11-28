const router = require("express").Router();
const { verifySign } = require("../helper/verifyToken");
const { Users,rols,users_rols } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authFunc = require("../helper/verifyToken");
//Recoge los datos del usuario logeado
router.get("/profile",authFunc.verifySign,async (req,res)=>{
    try {
        let data=jwt.verify(req.header("token"), process.env.SECRET_TOKEN);
        
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

router.post("/modify",authFunc.verifySign,async (req,res)=>{
    try {
      let data=jwt.verify(req.body.token, process.env.SECRET_TOKEN);
      const user = await Users.findOne({
        where: {
          id: data.id,
        },
      });
      const validpass= await bcrypt.compare(req.body.oldPassword,user.password);
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


})
module.exports = router;