import React, { Fragment, useState } from "react";
import { Container,OverlayTrigger,Tooltip,Tabs,Tab,Dropdown, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup, FormGroup } from "react-bootstrap";
import AddModulo from "./add_modulo.js";
import Modulo from "./modulo.js";
const ModulosList = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose= ()=> setShow(false);
    return (
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Modulo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddModulo/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className="content-list-head">
                <Col xs="auto">
                    <h3>Modulos</h3>
                    <Button onClick={handleShow} variant="round flex-shrink-0" data-target="#user-manage-modal">
                        <i className="material-icons">add</i>
                    </Button>
                </Col>

                <Col md="auto">
                    <InputGroup className="input-group-round">
                        <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="material-icons">filter_list</i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control className="filter-list-input" type="search" placeholder="Filtrar Modulos" />
                    </InputGroup>
                </Col>

            </Row>
            <div className="content-list-body">
                <div className="card-list">
                    <div className="card-list-head">
                        <h6>Modulos Activos</h6>
                    </div>
                    <div className="card-list-body">
                        <Modulo/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ModulosList;