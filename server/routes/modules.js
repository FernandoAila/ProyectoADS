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
        }).then( (data) => {return res.status(200).send(data)});
    } 
    catch (error) {
        return res.status(400).send(err);    
    }
});
router.get("/delete:id",async (req,res)=>{
    try {
        await Modules.destroy({where:req.params});
    } catch (err) {
       return res.status(400).send(err);
    }
});
router.get("/update:id",async (req,res)=>{
    try {
        const module= await Modules.Update({
            nameModule:req.body.name,
            descriptionModule:req.body.description
        },{
            where:{
                moduleId:req.params,
            }});
       return res.send(module);
    } catch (err) {
       return res.status(400).send(err);
    }
});
module.exports = router;