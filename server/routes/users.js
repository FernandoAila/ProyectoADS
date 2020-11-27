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
module.exports = router;