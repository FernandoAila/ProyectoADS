import React, { useState, useEffect } from "react";
import { useSelector,useDispatch} from "react-redux";
import{Redirect} from "react-router-dom";
import axios from "axios";
const Perfil= () =>{
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    if(!isLogged){
        return(
            <Redirect to="/login"  />
        );
    }
    return(
    <h1>Hola</h1>
    );
}
export default Perfil;