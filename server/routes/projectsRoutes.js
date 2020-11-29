const express = require("express");
const router = require("express").Router();
const { Projects,modules,Requirements } = require("../models");
const { Op } = require("sequelize");

//Muestra todos los proyectos disponibles
router.get("/all",async (req,res)=>{
    try {
        const {title,page,size} = req.query;
        console.log(req.query.title);
        var condition = title ? { nameProject: { [Op.like]: `%${title}%` } } : null;
        const { limit, offset } = getPagination(page, size);
        Projects.findAndCountAll({ where: condition, limit, offset })
        .then(data => {
          const response = getPagingData(data, page, limit);
         return res.send(response);
        });
    } catch (err) {
        return res.status(400).send(err);
    }
});
//Crea un proyecto
router.post("/create",async (req,res)=>{
    try {
        //Revisa si un proyecto con el mismo nombre existe
        console.log(req.body);
        const projectValid = await Projects.findOne({
            where: {
                nameProject: req.body.nameProject,
            },
          });
        if(projectValid) return res.status(400).send("Ya existe este proyecto");

        const project = await Projects.create({
            nameProject:req.body.nameProject,
            descriptionProject:req.body.descriptionProject,
        }).catch((err)=>console.log(err));
        const arrayReq= req.body.requeriments;
        console.log(arrayReq);
        for (const requi of arrayReq) {
            console.log(requi);
            await Requirements.create({
                nameRequirement:requi.name,
                descriptionRequirement:requi.desc,
                projectId:project.id
            });
          }
        return res.status(200).send(project);
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al crear el proyecto");    
    }
    });
//Muestra solo el proyecto
router.get("/:id",async (req,res)=>{
    try {
        const projects = await Projects.findOne({
            where: {
                id: req.params.id
            },
          });
        return res.send(projects);
    } catch (err) {
        return res.status(400).send(err);
    }
});

const getPagination = (page, size) => {
    const limit = size ? + size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };
  const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: projects } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
  
    return { totalItems, projects, totalPages, currentPage };
  };
module.exports = router;