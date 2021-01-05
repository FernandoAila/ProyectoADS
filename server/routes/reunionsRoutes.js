const express = require("express");
const router = require("express").Router();
const { Reunions,Reunion_Assistants } = require("../models");

//Retorna todas las reuniones que son parte de un usuario especifico
router.get("/allmyReunions",async (req,res)=>{
    try {
        const ArrReuAssi= await Reunion_Assistants.findAll({
            where: {
                IdUser: req.query.IdUser
            }
        });
        let arrReunion = [];
        for(const reunion of ArrReuAssi){

            let reunion = await Reunions.findOne({
                where: {
                    id:mod.IdUser,
                },
            });

        arrReunion.push(reunion);
        }
        return res.send(arrReunion);
    } catch (err) {
        return res.status(400).send(err);
    }
});

//Crea una reunion
router.post("/createReu",async (req,res)=>{
    try { 
        const reunion = await Reunions.create({
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

module.exports = router;