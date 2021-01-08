import React, { useState, useEffect, Fragment } from "react";
import { Container, Tabs, Tab, OverlayTrigger, Tooltip, Row, Col, Form,Button,Modal,Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { Redirect, useParams } from 'react-router-dom';
import ModulosList from "./partes_proyecto/modulos";
import ReqList from "./partes_proyecto/requerimientos";
import AddReunion from "./partes_proyecto/crear_reunion";



const MostrarProyecto = () => {
    const [projectName, setProjectName] = useState("");
    const [projectDesc, setProjectDesc] = useState("");
    const [editName, setEditName] = useState("");
    const [editDesc, setEditDesc] = useState("");
    const [show, setShow] = useState(false);
    const [modules, setModules] = useState([]);
    const [people, setPeople] = useState([]);
    const [requirements, setRequirements] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:8080/projects/" + id
        ).then(response => {
            setProjectDesc(response.data.descriptionProject);
            setProjectName(response.data.nameProject);
            axios.get("http://localhost:8080/requirements/allFromProject",
                {
                    params: {
                        projectId: id
                    }
                }).then(response => {
                    console.log(response.data)
                    setRequirements(response.data);
                });


            axios.get("http://localhost:8080/modules/allFromProject",
                {
                    params: {
                        projectId: id
                    }
                }).then(response => {
                    setModules(response.data);
                });
        });
    }, []);
    const handleChangeNombre=(e)=>{
        setEditName(e.target.value);
    }
    const handleChangeDesc=(e)=>{
        setEditDesc(e.target.value);
    }
    const handleClose= ()=> setShow(false);
    const handleSubmit = ()=>{
        axios.post("http://localhost:8080/projects/update",{
          nameProject:editName,
          descriptionProject:editDesc,
          id:id,
        }).then(()=>window.location.reload())
        }

    return (
        <Fragment>
            <Modal show={show=="edit"} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Projecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Nombre</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeNombre} type="text" defaultValue={projectName} placeholder="Nombre" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Descripcion</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeDesc} as="textarea" defaultValue={projectDesc} rows={3} placeholder="Descripcion" />
                    </Col>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show=="Reunion"} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Reunion</Modal.Title>
                </Modal.Header>
                    <AddReunion/>
            </Modal>
            <div class="breadcrumb-bar navbar bg-white ">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="/projects">Proyectos</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{projectName}</li>
            </ol>
          </nav>

          <DropdownButton id="testDropdown" drop={"left"} className="card-options" title={
                        <i class="material-icons">settings</i>
                    }>
                        <Dropdown.Item onClick={()=>{setShow("edit")}}  >Editar</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item ><span style={{color:"red"}}>Archivar projecto</span></Dropdown.Item>
                    </DropdownButton>

        </div>
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
                            <ReqList reqs={requirements} projectId={id} />
                            </Tab>
                        </Tabs>
                    </Col>

                </Row>

            </Container>
        </Fragment>
    );
}
export default MostrarProyecto;