import React, { Fragment, useState } from "react";
import { Container, OverlayTrigger, Tooltip, Tabs, Tab, Dropdown, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup, FormGroup } from "react-bootstrap";
const Modulo = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose= ()=> setShow(false);
    return (
        <Card className="card-task">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Modulo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Nombre</Form.Label>
                    <Col>
                        <Form.Control type="text" placeholder="Nombre" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Descripcion</Form.Label>
                    <Col>
                        <Form.Control as="textarea" rows={3} placeholder="Descripcion" />
                    </Col>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="card-body">
                <div className="card-title">
                    <h6 className="titlecard">Nombre modulo</h6>
                    <span className="text-small">Descripcion</span>
                </div>
                <div className="card-meta">
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
                    <DropdownButton id="testDropdown" drop={"left"} className="card-options" title={
                        <i class="material-icons">more_vert</i>
                    }>
                        <Dropdown.Item onClick={handleShow} >Editar</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item><span style={{color:"red"}}>Eliminar Modulo</span></Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </Card>

    )
}
export default Modulo;