import React, { Fragment, useEffect, useState } from "react";
import { Alert, OverlayTrigger, Tooltip, Tabs, Tab, Dropdown, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup, FormGroup } from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AddReunion = (props) => {
    const [interns, setInterns] = useState([]);
    const [nombre, setNombre] = useState("");
    const [Link, setLink] = useState("");
    const [Titulo, setTitulo] = useState("");
    const [descripcion, setDesc] = useState("");
    const [startDate, setStartDate] = useState(new Date());
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
        let value = Math.max(0, Math.min(23, Number(e.target.value)));
        setNombre(value)
    }
    const handleChangeDesc=(e)=>{
        let value = Math.max(0, Math.min(59, Number(e.target.value)));
        setDesc(value)
    }
    useEffect(() => {
        axios.get("http://localhost:8080/users/AllDevs"
        ).then((response) => {
            console.log(response.data);
            setInterns(response.data);
        })
    }, []);
    const handleSubmit = (e) => {
        axios.post("http://localhost:8080/reunionsRoutes/createReu", {
            Date: startDate,
            Hora:nombre,
            Link:Link,
            titulo:Titulo,
            Minuto:descripcion,
            idJefe: localStorage.getItem("userId"),
            Devs:asign
        }).then(() => { setState(true)})
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
                            <Form.Label column className="moduloDet" xs={3}>Nombre de la reunion</Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="Titulo"  onChange={(e)=>setTitulo(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column className="moduloDet" xs={3}>Link</Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="Link"  onChange={(e)=>setLink(e.target.value)}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column className="moduloDet" xs={3}>Hora</Form.Label>
                            <Col>
                                <Form.Control type="number" placeholder="12" min="0" max="23" onChange={handleChangeNombre}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column className="moduloDet" xs={3}>Minuto</Form.Label>
                            <Col>
                                <Form.Control type="number" placeholder="44" onChange={handleChangeDesc} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="align-items-center">
                            <Form.Label column className="moduloDet" xs={3}>Fecha</Form.Label>
                            <Col>
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} minDate={new Date()} />
                            </Col>
                        </Form.Group>
                    </Tab>
                    <Tab eventKey="asignacion" title="Asignacion">

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
export default AddReunion;