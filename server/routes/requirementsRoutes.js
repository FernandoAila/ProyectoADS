const express = require("express");
const router = require("express").Router();
const { Requirements,modules } = require("../models");

//Muestra todos los proyectos disponibles
router.get("/allFromProject",async (req,res)=>{
    try {
        const requirements= await Requirements.findAll({
            where: {
                projectId: req.body.projectId
            }
        });
        return res.send(requirements);
    } catch (err) {
        return res.status(400).send(err);
    }
});

//Crea un projecto
router.get("/create",async (req,res)=>{
    try {
        //Revisa si un proyecto con el mismo nombre existe
        const projectValid = await Requirements.findOne({
            where: {
                nameRequirement: req.body.requirementName,
            },
          });
        if(projectValid) return res.status(400).send("Ya existe este proyecto");

        const project = await Requirements.create({
            nameRequirement:req.body.requirementName,
            descriptionRequirement:req.body.requirementDescription,
            projectId: req.body.idProject
        }).then( (data) =>{return res.status(200).send(project)} )
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al crear el proyecto");    
    }
});

module.exports = router;