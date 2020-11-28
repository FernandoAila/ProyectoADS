const router = require("express").Router();
const { verifySign } = require("../helper/verifyToken");
const { Users,rols,users_rols } = require("../models");

//Recoge los datos del usuario logeado
router.get("/profile",async (req,res)=>{
    try {
        const user = await Users.findOne({
            where: {
              id: req.header("userId"),
            },
          });
        return res.send({email:user.email,nombre:user.nombre,apellido:user.apellido,telefono:user.telefono});
    } catch (err) {
        return res.status(400).send(err);
    }
});

router.post("/passUpdate",async (req,res)=>{
  try {
      const user = await Users.findOne({
          where: {
            id: req.header("userId"),
          },
        });
        
        const validPass = await bcrypt.compare(req.body.oldPassword, user.password);
        if (!validPass) return res.status(401).send({message:"constraseña antigua incorrecta"});

        //hasheo nueva contraseña
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(req.body.newPassword, salt);    
        
        await Users.update({
          password:hashPass,
        },{
          where: {
            id: req.header("userId"),
          },
        });

      return res.status(200).send({message:"constraseña antigua incorrecta"});
  } catch (err) {
      return res.status(400).send(err);
  }
});

module.exports = router;