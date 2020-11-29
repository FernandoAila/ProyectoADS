const express = require("express");
const router = require("express").Router();
const { Modules,Requirements,Requirements_Modules} = require("../models");

//Muestra todos los modulos que son parte de un Proyecto especifico, ademas de sus requerimientos asociados
router.get("/allFromProject",async (req,res)=>{
    try {
        //revisa los modulos asociados al proyecto dado
        const modules= await Modules.findAll({
            where: {
                projectId: req.body.projectId
            }
        });
        //revisa los requisitos que son del modulo
        const requirements= await Requirements_Modules.findAll({
            where: {
                moduleId: req.body.moduleId
            }
        });

        return res.send({modules,requirements});
    } catch (err) {
        return res.status(400).send(err);
    }
});

//Crea un modulo
router.post("/create",async (req,res)=>{
    try {
        //Revisa si un modulo con el mismo nombre existe
        const moduleValid = await Modules.findOne({
            where: {
                nameModule: req.body.moduleName,
            },
          });
        if(moduleValid) return res.status(400).send("Ya existe este modulo");

        const module = await Modules.create({
            nameModule:req.body.requirementName,
            descriptionModule:req.body.requirementDescription,
            projectId: req.body.idProject
        }).then( (data) =>{return res.status(200).send(module )} )
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al crear el modulo");    
    }
});


//Agrega Requerimiento existente a un Modulo existente
router.post("/addRequirement",async (req,res)=>{
    try {
        //Revisa si ya está asociado ese requerimiento a otro modulo o a si mismo
        const requirementValid = await Requirements_Modules.findOne({
            where: {
                requirementId: req.body.requirementId
            },
          });
        if(requirementValid) return res.status(400).send("Ya está asociado ese requerimiento a algun modulo");

        const requirements_module = await Requirements_Modules.create({
            moduleId: req.body.moduleId,
            requirementId: req.body.requirementId
        }).then( (data) =>{return res.status(200).send(requirements_module)} )
    }
    catch (error) {
        return res.status(400).send("Hubo un error al añadir el requerimiento");    
    }
});

module.exports = router;