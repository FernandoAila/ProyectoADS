  
const router = require("express").Router();
const { Users,rols,users_rols } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Maneja el registro de usuarios
router.post("/register", async (req, res) => {
  try {
    const emailValid = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (emailValid) return res.status(400).send("este usuario ya existe");
    //se encripta la constrasena
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(req.body.pass, salt);
    //se crea el usuario
    const user = await Users.create({
      nombre:req.body.name,
      apellido:req.body.surname,
      email: req.body.email,
      telefono:req.body.contact,
      password: hashPass,
    });
    const af = await rols.findOne({
      where: {
        rolsName: req.body.rol,
      },
    });
    await users_rols.create({
      rolsId: af.id,
      userId:user.id,
    }).then(()=>{console.log("ok");
    }).catch((err)=>console.log(err));
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//Maneja el login
router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    //Comprueba el usuario
    if (!user) return res.status(404).send({ message: "usuario o contraseña equivoacada" });
     //Compara la constraseña ingresada con la de la BD
    const validPass = await bcrypt.compare(req.body.pass, user.password);
    if (!validPass) return res.status(401).send({accessToken:null,message:"usuario o contraseña equivocada"});
    //Asigna un token al usurio
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN,{expiresIn:86400});
    return res.status(200).send({id:user.id,email:user.email,accessToken:token});
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;