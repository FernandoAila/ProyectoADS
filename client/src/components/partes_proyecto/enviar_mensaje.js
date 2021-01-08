import React, { Fragment, useEffect, useState } from "react";
import { Alert, OverlayTrigger, Tooltip, Tabs, Tab, Dropdown, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup, FormGroup } from "react-bootstrap";
import axios from "axios";
const EnviarMensaje = (props) => {
    const [interns, setInterns] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDesc] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [asign, setAsign] = useState( [] );
    const [state,setState]=useState(false);
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
        axios.get("http://localhost:8080/users/AllDevs"
        ).then((response) => {
            console.log(response.data);
            setInterns(response.data);
        })
    }, []);
    const handleSubmit = (e) => {
        console.log(asign);
        axios.post("http://localhost:8080/users/SendMessage", {
            Asunto: nombre,
            Contenido:descripcion,
            Devs:asign
        }).then(() => { console.log("ok") })
    }
    const handleCheckboxChange = event => {
        let newArray = [...asign, event.target.id];
        if (asign.includes(event.target.id)) {
          newArray = newArray.filter(item => item !== event.target.id);
        } 
        setAsign(newArray);
      };
    return (
        <Fragment>
            <Modal.Body>
            {state&&<Alert variant="primary">
                    Reunion correctamente creada
                    </Alert>}
                <Tabs defaultActiveKey="detalles" fill>
                    <Tab eventKey="detalles" title="Detalles">
                        <h6>Detalles Generales</h6>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column className="moduloDet" xs={3}>Asunto</Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="Asunto"  onChange={handleChangeNombre}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column className="moduloDet" xs={3}>Contenido</Form.Label>
                            <Col>
                            <Form.Control as="textarea" rows={3} placeholder="Contenido" onChange={handleChangeDesc} />
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


                            {filterResult.map((item,index) =>
                                <div key={item.id} className="custom-control custom-checkbox">
                                    <span className="d-flex align-items-center">
                                        <img alt={item.nombre + " " + item.apellido} src={item.profilePic} className="avatar mr-2"></img>
                                        <span className="h6 mb-0 nolinebreak" data-filter-by="text">{item.nombre + " " + item.apellido}</span>
                                        <Form.Check  value={item.id} onChange={ handleCheckboxChange} name="test" type="checkbox" className="checkbox-asig" id={item.id} />
                                    </span>
                                </div>
                            )}
                        </Form.Group>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer>
                <Button   onClick={handleSubmit} disabled={nombre.length ===0||descripcion.length ===0||asign.length===0} variant="primary">
                    Guardar
                    </Button>
            </Modal.Footer>
        </Fragment>
    );
}
export default EnviarMensaje;