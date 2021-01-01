import React, { useState} from "react";
import axios from "axios";
import {  Button,Modal,Col,Form,Row} from "react-bootstrap";
const Modulo = (props) => {
    const [monto, setMonto] = useState("");
    const [show, setShow]=useState(false);
    const handleChangeMonto=(e)=>{
        setMonto(e.target.value);
    }
    const handleSubmit=()=>{
        axios.post('http://localhost:8080/modulesRoutes/Apply', {id:props.modulo.id,monto:monto}, {
            headers: {
              'token': localStorage.getItem('token')
            }
          }).then((resp)=>{
            window.location.reload();
          });
    }
    const handleClose= ()=>{
        setShow(false);
        setMonto("");
    };
    
    return (
        <div class="card card-task">
                        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Postulacion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Ingrese Monto</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeMonto} type="number"  placeholder="00000" />
                    </Col>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Postular
                    </Button>
                </Modal.Footer>
            </Modal>
            <div class="card-body">
                <div class="card-title">
                    {props.modulo.nameModule}
                    <Button variant="primary" className="cotizar" onClick={()=>{setShow(true)}} >
                        Cotizar
                </Button>
                    <hr></hr>
                    <span class="text-small">
                        <p>{props.modulo.descriptionModule}</p>
                    </span>
                </div>
            </div>
        </div>

    )
}
export default Modulo;