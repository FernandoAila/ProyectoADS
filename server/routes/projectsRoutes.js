const express = require("express");
const router = require("express").Router();
const { Projects,Users,Requirements,Clients_Projects } = require("../models");
const { Op } = require("sequelize");

//Muestra todos los proyectos disponibles
router.get("/all",async (req,res)=>{
    try {
        const {title,page,size} = req.query;
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
        let projects = await Projects.findOne({
            where: {
                id: req.params.id
            },
          });
          const project_asig= await Clients_Projects.findOne({
              where:{
                projectId: req.params.id,
              }
          }).catch((err)=>console.log(err));
          if(!project_asig){
            return res.send(projects);
          }
          const user = await Users.findOne({
              where:{
                    id:project_asig.clientId
              }
          })
          projects.dataValues.client = user;
        return res.send(projects);
    } catch (err) {
        return res.status(400).send(err);
    }
});
//edita un proyecto
router.post("/update",async (req,res)=>{
    try {
        console.log("Tes");
        await  Projects.update(
            {
            nameProject:req.body.nameProject,
            descriptionProject:req.body.descriptionProject},
        {
        where:{
                id:req.body.id,
            }}).catch(
                (err)=>( console.log(err) ));
        console.log("ok");
       return res.send("ok");
    } catch (err) {
        console.log(err);
       return res.status(400).send(err);
    }
});

//asigna cliente
router.post("/AssignClient",async (req,res)=>{
    try {
        //Revisa si un proyecto con el mismo nombre ya está asignado
        const projectValid = await Clients_Projects.findOne({
            where: {
                projectId: req.body.idProject,
            },
          }).catch((err)=>console.log(err));
        if(projectValid) return res.status(400).send("Ya está asignado este proyecto");
        const user = await Users.findOne({
            where:{
                email:req.body.email
            }
        });
        const client_project = await Clients_Projects.create({
            projectId:req.body.idProject,
            clientId:user.id,
        }).catch((err)=>console.log(err));

        return res.status(200).send(client_project);
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al asignar el proyecto");    
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