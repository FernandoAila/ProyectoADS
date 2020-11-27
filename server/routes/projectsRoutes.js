const express = require("express");
const router = require("express").Router();
const { Projects,modules } = require("../models");

//Muestra todos los proyectos disponibles
router.get("/all",async (req,res)=>{
    try {
        const projects= await Projects.findAll();
        return res.send(projects);
    } catch (err) {
        return res.status(400).send(err);
    }
});
//Crea un projecto
router.get("/create",async (req,res)=>{
    try {
        //Revisa si un proyecto con el mismo nombre existe
        const projectValid = await Projects.findOne({
            where: {
                nameProject: req.body.projectName,
            },
          });
        if(projectValid) return res.status(400).send("Ya existe este proyecto");

        const project = await Projects.create({
            nameProject:req.body.projectName,
            descriptionProject:req.body.projectDescription,
        }).then( (data) =>{return res.status(200).send(project)} )
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al crear el proyecto");    
    }
    });
//Muestra solo el proyecto
router.get("/:id",async (req,res)=>{
    try {
        const projects= await Projects.findAll({where:req.params});
        return res.send(projects);
    } catch (err) {
        return res.status(400).send(err);
    }
});
module.exports = router;