import React, { Fragment, useEffect, useState } from "react";
import { Container, OverlayTrigger, Tooltip, Tabs, Tab, Dropdown, DropdownButton, ListGroup, Accordion, Card, FormControl, Form, Button, Row, Col, Table, Modal, InputGroup, FormGroup } from "react-bootstrap";

const AddModulo = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const handleSearchChange=(e)=>{
        setSearchTerm(e.target.value);
    }


    return (
        <Tabs defaultActiveKey="detalles" fill>
            <Tab eventKey="detalles" title="Detalles">
                <h6>Detalles Generales</h6>
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
                    <div className="custom-control custom-checkbox">
                        <span class="d-flex align-items-center">
                                    <img alt="Claire Connors" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" class="avatar mr-2"></img>
                                    <span class="h6 mb-0 nolinebreak" data-filter-by="text">Sujeto de pruebas</span>
                                    <Form.Check onChange type={"checkbox"} className="checkbox-asig"  id={"cambiar"}/>
                        </span>
                    </div>
                </Form.Group>
            </Tab>
        </Tabs>


    );
}
export default AddModulo;