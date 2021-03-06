const express = require("express");
const router = require("express").Router();
const { Requirements,modules } = require("../models");

//Muestra todos los requerimientos que son parte de un Proyecto especifico
router.get("/allFromProject",async (req,res)=>{
    try {
        const requirements= await Requirements.findAll({
            where: {
                projectId: req.query.projectId
            }
        });
        return res.send(requirements);
    } catch (err) {
        return res.status(400).send(err);
    }
});

//Crea un requerimiento
router.post("/create",async (req,res)=>{
    try {
        //Revisa si un requerimiento con el mismo nombre existe
        const requirementValid = await Requirements.findOne({
            where: {
                nameRequirement: req.body.requirementName,
                projectId: req.body.idProject
            },
          });
        if(requirementValid) return res.status(400).send("Ya existe este requerimiento");
        const requirement = await Requirements.create({
            nameRequirement:req.body.requirementName,
            descriptionRequirement:req.body.requirementDescription,
            projectId: req.body.idProject
        });
        return res.status(200).send("ok");
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al crear el requerimiento");    
    }
});
router.post("/update",async (req,res)=>{
    try {
        await  Requirements.update(
            {
                nameRequirement:req.body.requirementName,
                descriptionRequirement:req.body.requirementDescription},
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
router.post("/delete",async (req,res)=>{
    try {
         await Requirements.destroy({
            where: {
              id: req.body.id
            }
          }).catch(err=>console.log(err));
          return res.status(200).send("ok");
    } catch (err) {
       return res.status(400).send(err);
    }
});
module.exports = router;