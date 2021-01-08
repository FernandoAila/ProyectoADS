import React, { Fragment, useState ,useEffect} from "react";
import axios from "axios";
import { OverlayTrigger, Tooltip, Dropdown, DropdownButton, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
const Requerimiento = (props) => {
    const [show, setShow] = useState(false);
    const [nombre,setNombre]=useState(props.data.nameRequirement);
    const [descripcion,setDesc]=useState(props.data.descriptionRequirement);
    const handleClose= ()=> setShow(false);
    const handleDelete = ()=>{
        axios.post("http://localhost:8080/requirements/delete",{
          id: props.data.id,
        }).then(()=>window.location.reload())
        }
    const handleChangeNombre=(e)=>{
        setNombre(e.target.value);
    }
    const handleChangeDesc=(e)=>{
        setDesc(e.target.value);
    }
    const handleSubmit = ()=>{
    axios.post("http://localhost:8080/requirements/update",{
        requirementName:nombre,
        requirementDescription:descripcion,
      idM: props.data.id,
    }).then(()=>window.location.reload())
    }
    return (
        <Card className="card-task">
            <Modal show={show=="edit"} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Requerimiento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Nombre</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeNombre} type="text" defaultValue={props.data.nameRequirement} placeholder="Nombre" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Descripcion</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeDesc} as="textarea" defaultValue={props.data.descriptionRequirement} rows={3} placeholder="Descripcion" />
                    </Col>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="card-body">
                <div className="card-title">
                    <h6 className="titlecard">{props.data.nameRequirement}</h6>
                    <span className="text-small">{props.data.descriptionRequirement}</span>
                </div>
                <div className="card-meta">
                    <DropdownButton id="testDropdown" drop={"left"} className="card-options" title={
                        <i className="material-icons">more_vert</i>
                    }>
                        <Dropdown.Item onClick={()=>{setShow("edit")}} >Editar</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleDelete}><span style={{color:"red"}}>Eliminar Requerimiento</span></Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </Card>

    )
}
export default Requerimiento;