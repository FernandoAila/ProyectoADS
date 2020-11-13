  
const router = require("express").Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      email: req.body.email,
      password: hashPass,
    })
    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) return res.status(400).send("usuario o contrasena equivocada");
    const validPass = await bcrypt.compare(req.body.pass, user.password);
    if (!validPass)
      return res.status(400).send("usuario o contrasena equivocada");
    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN);
    return res.header("auth-token", token).send("estas logeado");
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;