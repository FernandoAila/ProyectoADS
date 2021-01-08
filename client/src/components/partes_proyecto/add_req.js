import React, { Fragment, useEffect, useState } from "react";
import { Container, OverlayTrigger, Tooltip, Tabs, Tab, Dropdown, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup, FormGroup } from "react-bootstrap";
import axios from "axios";
const AddReq = (props) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDesc] = useState("");;
    const handleChangeNombre=(e)=>{
        setNombre(e.target.value)
    }
    const handleChangeDesc=(e)=>{
        setDesc(e.target.value)
    }
    const handleSubmit = (e) => {
        console.log("Test");
        axios.post("http://localhost:8080/requirements/create", {
            requirementName: nombre,
            requirementDescription: descripcion,
            idProject: props.projectId,
        }
        ).then((resp) => {
                window.location.reload();
        }
        )
    }
    return (
        <Fragment>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
                <Button   onClick={handleSubmit} disabled={nombre.length ===0||descripcion.length ===0} variant="primary">
                    Guardar
                    </Button>
            </Modal.Footer>
        </Fragment>
    );
}
export default AddReq;