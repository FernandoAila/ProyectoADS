import React, { Fragment, useEffect, useState } from "react";
import { Container, OverlayTrigger, Tooltip, Tabs, Tab, Dropdown, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup, FormGroup } from "react-bootstrap";
import axios from "axios";
const AddModulo = (props) => {
    const [interns, setInterns] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDesc] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [asign, setAsign] = useState("");
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
    const filterResult=interns.filter( intern=>{
        return intern.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || intern.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    })
    const handleChangeNombre=(e)=>{
        setNombre(e.target.value)
    }
    const handleChangeDesc=(e)=>{
        setDesc(e.target.value)
    }
    useEffect(() => {
        axios.get("http://localhost:8080/users/AllInterns"
        ).then((response) => {
            console.log(response.data);
            setInterns(response.data);
        })
    }, []);
    const handleSubmit = (e) => {
        console.log("Test");
        axios.post("http://localhost:8080/modulesRoutes/create", {
            moduleName: nombre,
            descriptionModule: descripcion,
            projectId: props.projectId,
        }
        ).then((resp) => {
            if (asign) {
                axios.post("http://localhost:8080/modulesRoutes/AssignDeveloper", {
                    idModule: resp.data.id,
                    id: asign
                }).then(() => { window.location.reload() })
            }
            else{
                window.location.reload();
            }

        }
        )
    }
    return (
        <Fragment>
            <Modal.Body>
                <Tabs defaultActiveKey="detalles" fill>
                    <Tab eventKey="detalles" title="Detalles">
                        <h6>Detalles Generales</h6>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column className="moduloDet" xs={3}>Nombre</Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="Nombre" onChange={handleChangeNombre}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column className="moduloDet" xs={3}>Descripcion</Form.Label>
                            <Col>
                                <Form.Control as="textarea" rows={3} placeholder="Descripcion" onChange={handleChangeDesc} />
                            </Col>
                        </Form.Group>
                    </Tab>
                    <Tab eventKey="asignacion" title="Asignacion">
                        <div className="mb-3">
                            <ul className="avatars text-center">
                                <li>
                                    <OverlayTrigger overlay={<Tooltip id="button-tooltip-2">Nombre Sujeto</Tooltip>}>
                                        <img alt="Claire Connors" className="avatar"
                                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"></img>
                                    </OverlayTrigger>
                                </li>
                            </ul>
                        </div>
                        <InputGroup className="input-group-round">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <i className="material-icons">filter_list</i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control onChange={handleSearchChange} className="filter-list-input" type="search" placeholder="Buscar Personas" />
                        </InputGroup>
                        <Form.Group className="users">


                            {filterResult.map((item) =>
                                <div key={item.id} className="custom-control custom-checkbox">
                                    <span className="d-flex align-items-center">
                                        <img alt={item.nombre + " " + item.apellido} src={item.profilePic} className="avatar mr-2"></img>
                                        <span className="h6 mb-0 nolinebreak" data-filter-by="text">{item.nombre + " " + item.apellido}</span>
                                        <Form.Check checked={asign == item.id} value={item.id} onChange={(e) => { setAsign(e.target.value) }} name="test" type="radio" className="checkbox-asig" id={item.id} />
                                    </span>
                                </div>
                            )}
                        </Form.Group>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button   onClick={handleSubmit} disabled={nombre.length ===0||descripcion.length ===0} variant="primary">
                    Guardar
                    </Button>
            </Modal.Footer>
        </Fragment>
    );
}
export default AddModulo;