const express = require("express");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { Reunions,Reunion_Assistants,users_rols } = require("../models");

//Retorna todas las reuniones que son parte de un usuario especifico
router.get("/allmyReunions",async (req,res)=>{
    try {
        var DateComp = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());
        let data=jwt.verify(req.header("token"), process.env.SECRET_TOKEN);
        if (!data) return res.status(401).send("no tienes autorizado entrar");
        console.log(data.id);

        const user = await users_rols.findOne({
            where: {
                userId: data.id
            }
        });

        if(user.rolsId<=2){
            console.log("entra al if")
            console.log(DateComp)
            let reunion = await Reunions.findAll({
                where: {
                    IdJefe:data.id,
                    Date: {
                        [Op.gte]: DateComp
                    }
                }
            });
            return res.send(reunion);
        }

        else{
            const ArrReuAssi= await Reunion_Assistants.findAll({
                where: {
                    IdUser: data.id
                }
            });


            let arrReunion = [];
            for(const reu of ArrReuAssi){
    
                let reunion = await Reunions.findOne({
                    where: {
                        id:reu.IdReu,
                        Date: {
                            [Op.gte]: DateComp
                        }
                    },
                });
    
            arrReunion.push(reunion);
            }
            return res.send(arrReunion);
        }

    } catch (err) {
        return res.status(400).send(err);
    }
});

//entrega arreglo de desarrrolladores citados en la reunion
router.get("/ReunionsDev",async (req,res)=>{
    try {
        const ArrReuAssi= await Reunion_Assistants.findAll({
            where: {
                IdReu: req.query.IdReu
            }
        });
        return res.send(ArrReuAssi);

    } catch (err) {
        return res.status(400).send(err);
    }
});

//Crea una reunion
router.post("/createReu",async (req,res)=>{
    try { 
        const reunion = await Reunions.create({
            Date: req.body.Date,
            IdJefe: req.body.idJefe,
            Hour: req.body.Hour,
            Minute: req.body.Minute
        });

        for(const dev of req.body.Devs){
            Reunion_Assistants.create({
                IdReu: reunion.id,
                IdUser: dev.id
            });
        }
        return res.status(200).send("ok");
    } 
    catch (error) {
        return res.status(400).send("Hubo un error al crear el requerimiento");    
    }
});



module.exports = router;