import React, { useState, useRef,useEffect} from "react";
import { login} from "../Redux/actions/auth";
import {Table,Button} from "react-bootstrap"
import { useSelector, useDispatch} from "react-redux";

const Project=()=>{
return(<tr>
    <td>                                            
        <h6 className="mb-1">Nombre Proyecto</h6>
        <p className="m-0"> Descripcion</p>
    </td>
    <td>
    <Button variant="primary">Añadir requerimientos</Button>
    </td>
    <td>
    <Button variant="primary">Añadir modulos</Button>
    </td>
    </tr>)
}
export default Project;