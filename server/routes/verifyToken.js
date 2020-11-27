/*Realiza autentificacion y autorizacion
-Comprueba si el token entregado el valido o no.
-Realiza la comprobacion de roles de usuario y accesso TODO
*/
const jwt = require("jsonwebtoken");
const {users_rols } = require("../models");
function verifySign(req, res, nxt) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("no tienes autorizado entrar");
  try {
    const payload = jwt.verify(token, process.env.SECRET_TOKEN);
    req.user = payload;
    nxt();
  } catch (error) {
    return res.status(401).send("no tienes autorizado entrar");
  }
}

function verRol(req){
 const data= users_rols.findOne({
    where: {
      userId: req.header("userId") 
    },
  })
  return data.rolsId;
} 
//function verRoles
module.exports = verifySign;
