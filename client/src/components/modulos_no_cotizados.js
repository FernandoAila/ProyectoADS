import axios from "axios";
import React, { useState, useRef,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import {Button} from "react-bootstrap"
import Modulo from "./partes_nocotizado/modulo.js";
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});
  

const NoCotizadosModulos=()=>{

    const [modulos, setModulos] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        axios.get("http://localhost:8080/modulesRoutes/postulationModules",
        {
            headers:
                {
                    'token': localStorage.getItem('token')
                }
      }).then(response => {
          console.log(response.data);
          setModulos(response.data);
      });
      }, []);
    return(
        <div class="main-container">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-11 col-xl-10">
                        <div class="tab-content">                       
                            <div class="content-list-body">
                                <div class="card-list">
                                    <div class="card-list-head">
                                        <h3>Modulos no cotizados</h3>
                                    </div>
                                    <div class="card-list-body-fklter-list-1607686290867">
                                        {modulos.map( (modulo,index) => (
                                            <Modulo modulo={modulo} key={index} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NoCotizadosModulos;