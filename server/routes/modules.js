const express = require("express");
const router = require("express").Router();
const { Projects,Modules } = require("../models");


router.get("/allFromProject",async (req,res)=>{
    try {
        const modules= await Modules.findAll({
            where: {
                projectId: req.query.projectId
            }
        });
        return res.send(modules);
    } catch (err) {
        return res.status(400).send(err);
    }
});
router.post("/create",async (req,res)=>{
    try {
        //Revisa si un modulo con el mismo nombre existe
        console.log(req.body.projectId);
        const moduleValid = await Modules.findOne({
            where: {
                nameModule: req.body.moduleName,
                projectId: req.body.projectId
            },
          });
        if(moduleValid) return res.status(400).send("Ya existe un modulo con el mismo nombre");
        await Modules.create({
            nameModule:req.body.moduleName,
            descriptionModule:req.body.descriptionModule,
            projectId:req.body.projectId,
            assigned: false
        }).then( (data) => {return res.status(200).send(data)});
    } 
    catch (error) {
        return res.status(400).send(err);    
    }
});
router.post("/delete",async (req,res)=>{
    try {
         await Modules.destroy({
            where: {
              id: req.body.id
            }
          }).catch(err=>console.log(err));
          return res.status(200).send("ok");
    } catch (err) {
       return res.status(400).send(err);
    }
});
router.post("/update",async (req,res)=>{
    try {
        console.log(req.body.nameModule,req.body.descriptionModule,req.body.idM);
        await  Modules.update(
            {
            nameModule:req.body.nameModule,
            descriptionModule:req.body.descriptionModule},
        {
        where:{
                id:req.body.idM,
            }}).catch(
                (err)=>( console.log(err) ));
        console.log("ok");
       return res.send("ok");
    } catch (err) {
        console.log(err);
       return res.status(400).send(err);
    }
});
module.exports = router;