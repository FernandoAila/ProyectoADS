import React, { Fragment, useEffect, useState } from "react";
import { Container, OverlayTrigger, Tooltip, Tabs, Tab, Dropdown, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup, FormGroup } from "react-bootstrap";
import axios from "axios";
const AddProyect = (props) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDesc] = useState("");
    const [estado, setEstado]=useState(0);
    const blankReq = { name: '', desc: '' };

    const [requeriments, setRequirements] = useState([
        {...blankReq}
      ]);
    const handleChangeNombre=(e)=>{
        setNombre(e.target.value)
    }
    const handleChangeDesc=(e)=>{
        setDesc(e.target.value)
    }
    const handleEnviar =()=>{
      axios.post('http://localhost:8080/projects/create', {
      nameProject: nombre,
      descriptionProject: descripcion,
      requeriments:[]
    }).then((data) => {
      console.log(data);
      setEstado(data.data.id);
      //dispatch(redirect("/perfil"));
    }).catch((err)=>{
      console.log(err);
    });

  }

    return (
        <Fragment>
              <Modal.Header closeButton>
                    <Modal.Title>Crear Projecto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Nombre</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeNombre} type="text"  placeholder="Nombre" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Descripcion</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeDesc} as="textarea"  rows={3} placeholder="Descripcion" />
                    </Col>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleEnviar}>
                        Enviar
                    </Button>
                </Modal.Footer>
        </Fragment>
    );
}
export default AddProyect;