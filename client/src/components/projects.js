import React, { useState, useRef,useEffect} from "react";
import { login} from "../Redux/actions/auth";
import {ListGroup} from "react-bootstrap"
import { useSelector, useDispatch} from "react-redux";
const Projects= (props)=>{

    const isLogged = useSelector((store) => store.authReducer.isLogged);


    return(
    <div>        
    <h1>Projectos</h1>
    <ListGroup>
      <ListGroup.Item>Cras justo odio</ListGroup.Item>
      <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
      <ListGroup.Item>Morbi leo risus</ListGroup.Item>
      <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
    </ListGroup>
    </div>

    )
}
export default Projects;