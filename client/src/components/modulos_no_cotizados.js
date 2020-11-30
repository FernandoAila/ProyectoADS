import axios from "axios";
import React, { useState, useRef,useEffect} from "react";

const NoCotizadosModulos=()=>{

    const [modulos, setModulos] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/modulesRoutes/AllUnasigned",
        {
      }).then(response => {
          console.log(response.data);
          setModulos(response.data);
      });
      }, []);
    return(
        <div>
                    <h1>Modulos no cotizados</h1>
            {modulos.map( (modulo,index) => (
                <div>
                    <strong>Nombre</strong>
                <li 
                className="modulo" key={index}>{modulo.nameModule}</li>
                <strong>Descripcion</strong>
                                <div
                className="modulo" key={index}>{modulo.descriptionModule}</div>
                </div>
            ))}
        </div>
    );
}
export default NoCotizadosModulos;