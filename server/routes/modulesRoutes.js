const express = require("express");
const router = require("express").Router();
const { Modules,Requirements,Requirements_Modules,Developers_Modules} = require("../models");

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
                projectId: req.body.projectId
            },
          });
        if(moduleValid) return res.status(400).send("Ya existe este modulo");

        const module = await Modules.create({
            nameModule:req.body.moduleName,
            descriptionModule:req.body.descriptionModule,
            projectId: req.body.idProject,
            assigned: false
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

//Asignar desarrollador
router.post("/AssignDeveloper",async (req,res)=>{
    try {
        console.log(req.body);

        //encuentra al modulo dado el nombre
        const module = await Modules.findOne({
            where: {
                nameModule: req.body.idModule,
            },
        });

        //encuentra al usuario dado el nombre
        const user = await Users.findOne({
            where: {
                name: req.body.developerName,
                apellido: developerLastName 
            },
        });

        //revisa si ya está asignado
        const moduleValid = await Developers_Modules.findOne({
            where: {
                moduleId: module.Id,
            },
          });
        if(moduleValid) return res.status(400).send("Ya está asignado este modulo");

        //lo crea en la tabla de asignacion
        const developer_modules = await Developers_Modules.create({
            developerId:user.id,
            moduleId:module.Id,
        }).catch((err)=>console.log(err));

        //Marca el modulo como asignado
        const moduleAssig = await Modules.update({
            assigned:true,
            where:{
                moduleId:module.Id
            }
        }).catch((err)=>console.log(err));

        return res.status(200).send({developer_modules,moduleAssig});
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al asignar el modulo");    
    }
});

// Postular a un modulo
router.post("/Apply",async (req,res)=>{
    try {
        console.log(req.body);

        //encuentra al modulo dado el nombre
        const module = await Modules.findOne({
            where: {
                nameModule: req.body.idModule,
            },
        });

        //encuentra al usuario dado el nombre
        const user = await Users.findOne({
            where: {
                email: req.body.developerMail
            },
        });

        //lo crea en la tabla de postulacion
        const freelance_module = await Freelance_Modules.create({
            developerId:user.id,
            moduleId:module.Id,
        }).catch((err)=>console.log(err));

        return res.status(200).send(freelance_module);
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al asignar el modulo");    
    }
});

//Devuelve modulos no asignados
router.get("/AllUnasigned",async (req,res)=>{
    try {
        console.log("hohoo");
        //Busca todos los modelos no asignados dado un proyecto
        const modules= await Modules.findAll({
            where: {
                assigned: false
            }
        });
        return res.send(modules);
    } catch (err) {
        return res.status(400).send(err);
    }
});

//Asignar desarrollador
router.post("/ReAssignDeveloper",async (req,res)=>{
    try {
        console.log(req.body);

        //encuentra al modulo a reasignar dado el nombre
        const module = await Modules.findOne({
            where: {
                nameModule: req.body.idModule,
            },
        });

        //encuentra al usuario nuevo dado el nombre
        const user = await Users.findOne({
            where: {
                name: req.body.developerName,
                apellido: developerLastName 
            },
        });

        //Marca el modulo como asignado
        const moduleAssig = await Developers_Modules.update({
            developerId:user.Id,
            where:{
                moduleId:module.Id
            }
        }).catch((err)=>console.log(err));

        return res.status(200).send({developer_modules,moduleAssig});
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al re-asignar el modulo");    
    }
});

module.exports = router;