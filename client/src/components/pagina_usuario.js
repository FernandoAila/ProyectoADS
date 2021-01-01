import {useParams } from 'react-router-dom';
import UserPage from "./user_page.js";
import OwnPage from "./own_page.js";
import React, { Fragment} from "react";

const PaginaUsuario=()=>{
    let { id } = useParams();
    return(
        <Fragment>
            {id==localStorage.getItem("userId")? <OwnPage/>:
            <UserPage/>
            }
        </Fragment>
    )
}

export default PaginaUsuario;