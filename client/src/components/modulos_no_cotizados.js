import axios from "axios";
import React, { useState, useRef,useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});
  

const NoCotizadosModulos=()=>{

    const [modulos, setModulos] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        axios.get("http://localhost:8080/modulesRoutes/AllUnasigned",
        {
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
                                            <div class="card card-task">
                                                <div class="card-body">
                                                    <div class="card-title">
                                                        {modulo.nameModule}
                                                        <hr></hr>
                                                        <span class="text-small">
                                                            <p>{modulo.descriptionModule}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
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