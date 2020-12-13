import React, { useState,  useEffect } from "react";
import { Container, Tabs, Tab,OverlayTrigger,Tooltip, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Redirect, useParams } from 'react-router-dom';
import ModulosList from "./partes_proyecto/modulos";


const MostrarProyecto = () => {
    const [projectName,setProjectName]=useState("");
    const [projectDesc,setProjectDesc]=useState("");
    const [modules,setModules]=useState([]);
    const [people,setPeople]=useState([]);
    const[requirements,setRequirements]=useState([]);
    let { id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:8080/projects/"+id
        ).then(response => {
          setProjectDesc(response.data.descriptionProject);
          setProjectName(response.data.nameProject);
          axios.get("http://localhost:8080/requirements/allFromProject",
          {
              params:{
                  projectId:id
              }
        }).then(response => {
            setRequirements(response.data);
        });
         

        axios.get("http://localhost:8080/modules/allFromProject",
        {
            params:{
                projectId:id
            }
      }).then(response => {
          setModules(response.data);
      });
        });
      }, []);


    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={11} xl={10}>
                    <div className="page-header">
                        <h1>{projectName}</h1>
                        <p className="lead">{projectDesc}</p>
                        <div className="d-flex align-items-center">
                            <ul className="avatars">
                                <li>
                                    <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Claire Connors">
                                    <OverlayTrigger overlay={<Tooltip id="button-tooltip-2">Nombre Sujeto</Tooltip>}>
                                        <img alt="Claire Connors" className="avatar" 
                                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"></img>
                                        </OverlayTrigger>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="modulos" fill>
                        <Tab eventKey="modulos" title="Modulos">
                            <ModulosList modules={modules} projectId={id} />
                        </Tab>
                        <Tab eventKey="Requerimientos" title="Requerimientos">
                            <p>TODO</p>
                        </Tab>
                    </Tabs>
                </Col>

            </Row>

        </Container>
    );
}
export default MostrarProyecto;