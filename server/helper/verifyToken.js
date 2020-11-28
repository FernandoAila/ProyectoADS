/*Realiza autentificacion y autorizacion
-Comprueba si el token entregado el valido o no.
-Realiza la comprobacion de roles de usuario y accesso TODO
*/
const jwt = require("jsonwebtoken");
const {users_rols } = require("../models");
function verifySign(req, res, nxt) {
  const token = req.header("token");
  if (!token) return res.status(401).send("no tienes autorizado entrar");
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = payload;
    nxt();
  } catch (error) {
    return res.status(401).send("no tienes autorizado entrar");
  }
}
//Permisos de admin
function isAdmin(req,res,nxt){
  rol= users_rols.findOne({
    where: {
      userId: req.header("userId"),
    },
  })
  .then( 
    (data) =>
    {
      if(rol > 1){
        return res.status(401).send("no tienes autorizado entrar");
      }
      else{
        nxt();
      }
    }
  ).catch(
    (err)=>res.status(401).send(err)
  );
}
function isJefeP(req,res,nxt){
  rol= users_rols.findOne({
    where: {
      userId: req.header("userId"),
    },
  })
  .then( 
    (data) =>
    {
      if(rol > 2){
        return res.status(401).send("no tienes autorizado entrar");
      }
      else{
        nxt();
      }
    }
  ).catch(
    (err)=>res.status(401).send(err)
  );
}
const authFunc={
  verifySign:verifySign,
  isAdmin:isAdmin,
  isJefep:isJefeP,
};
//function verRoles
module.exports = authFunc;
