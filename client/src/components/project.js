import React, { useState, useRef, useEffect } from "react";
import { Container, Tabs, Tab,OverlayTrigger,Tooltip, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup } from "react-bootstrap";
import axios from "axios";
import { Redirect, useParams } from 'react-router-dom';
import ModulosList from "./partes_proyecto/modulos";


const MostrarProyecto = () => {
    const [projectName,setProjectName]=useState("");
    const [projectDesc,setProjectDesc]=useState("");
    const [modules,setModules]=useState([]);
    const [people,setPeople]=useState([]);



    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={11} xl={10}>
                    <div className="page-header">
                        <h1>Test</h1>
                        <p className="lead">Descripcion</p>
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
                            <Button variant="round flex-shrink-0" data-target="#user-manage-modal">
                                <i className="material-icons">add</i>
                            </Button>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="modulos" fill>
                        <Tab eventKey="modulos" title="Modulos">
                            <ModulosList />
                        </Tab>
                        <Tab eventKey="Requerimientos" title="Requerimientos">
                            <p>test2</p>
                        </Tab>
                    </Tabs>
                </Col>

            </Row>

        </Container>
    );
}
export default MostrarProyecto;