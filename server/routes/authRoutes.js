const { transporter, mailer } = require("../helper/mailer");
const { usePasswordHashToMakeToken, getPasswordResetURL } = require("../helper/reset");
const router = require("express").Router();
const { Users, rols, users_rols } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authFunc = require("../helper/verifyToken");
const verify = require("jsonwebtoken/verify");
const { verifySign, isJefep } = require("../helper/verifyToken");
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
    const hashPass = await bcrypt.hash(req.body.password, salt);
    //se crea el usuario
    const user = await Users.create({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      telefono: req.body.telefono,
      password: hashPass,
    });
    //Añadimos el id del usuario y el rol a la BD
    await users_rols.create({
      rolsId: req.body.rol,
      userId: user.id,
    }).then(() => {
      console.log("ok");
    }).catch((err) => console.log(err));
    const token = usePasswordHashToMakeToken(user);
    const url = getPasswordResetURL(user, token);
    const sendEmail = () => {
      transporter.sendMail(mailer(user, url), (err, info) => {
        if (err) {
          console.log(err);
          return res.status(400).send(err);
        }
        console.log(`** Email enviado**`, info.response)
      })
    };
    sendEmail();
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/change_passFirst/:userId/:token", async (req, res) => {
  const { userId, token } = req.params;
  const password = req.body.password;
  console.log(userId);
  const user=await Users.findOne({
    where: {
      id: userId
    },
    raw : true,
  });
  console.log(user);
  const secret = user.password + "-" + user.createdAt;
  const payload = jwt.decode(token, secret);
  console.log(payload);
  if (payload.id === user.id) {
    console.log("LLEGUE");
    const salt = await bcrypt.genSalt(10);
    const hashPass =  await bcrypt.hash(password, salt);
    await Users.update({
      password: hashPass,
      firstTime:false,
    }, {
      where: {
        id: user.id,
      },
    });
  }
  return res.status(200).send("ok");
})

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
    if (!validPass) return res.status(401).send({ accessToken: null, message: "usuario o contraseña equivocada" });
    //Asigna un token al usurio
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, { expiresIn: 86400 });
    return res.status(200).send({ id: user.id, email: user.email, accessToken: token,profilepic:user.profilePic });
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;