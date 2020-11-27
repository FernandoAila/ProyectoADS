const express = require("express");
const router = express.Router();
const authFunc = require("../helper/verifyToken");
router.get("/all",(req,res)=>{
    return res.status(200).send("ACCESO PUBLICO");
}
);
router.get("/users",[authFunc.verifySign,authFunc.isAdmin], async (req,res)=>{ 
    return res.status(200).send("ACCESO SOLO PARA USERS");
});
router.get("/admin",[authFunc.verifySign,authFunc.isAdmin], async (req,res)=>{ 
    return res.status(200).send("ACCESO SOLO PARA ADMINS");
})


module.exports = router;