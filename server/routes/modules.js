const express = require("express");
const router = require("express").Router();
const { Projects,modules } = require("../models");


router.get("/update:id",async (req,res)=>{
    try {
        const modules= await Modules.findAll({
            where: {
            projectId: req.params
            }
          });
        return res.send(modules);
    } catch (err) {
        return res.status(400).send(err);
    }
});
router.get("/create",async (req,res)=>{
    try {
        //Revisa si un modulo con el mismo nombre existe
        const moduleValid = await Modules.findOne({
            where: {
                nameProject: req.body.projectName,
            },
          });
        if(moduleValid) return res.status(400).send("Ya existe un modulo con el mismo nombre");

        const module = await Modules.create({
            nameModule:req.body.moduleName,
            descriptionModule:req.body.moduleDescription,
            projectId:projectId,
        }).then( (data) => {return res.status(200).send(module)})
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al crear el proyecto");    
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