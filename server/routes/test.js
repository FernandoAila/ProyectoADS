const express = require("express");
const router = express.Router();
const verifySign = require("./verifyToken");

router.get("/all",(req,res)=>{
    return res.status(200).send("ACCESO PUBLICO");
}
);
router.get("/users",verifySign,(req,res)=>{
    return res.status(200).send("ACCESO SOLO PARA USERS");
})

module.exports = router;