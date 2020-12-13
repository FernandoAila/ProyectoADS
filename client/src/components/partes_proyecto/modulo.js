import React, { Fragment, useState ,useEffect} from "react";
import axios from "axios";
import { OverlayTrigger, Tooltip, Dropdown, DropdownButton, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
import EditAsig from "./editAsignacion.js";
const Modulo = (props) => {
    const [show, setShow] = useState(false);
    const [nombre,setNombre]=useState(props.data.nameModule);
    const [descripcion,setDesc]=useState(props.data.descriptionModule);
    const handleClose= ()=> setShow(false);
    const[datadev,setDataDev]=useState({});
    useEffect(() => {
        axios.get("http://localhost:8080/modulesRoutes/modulesDeveloper",{
            params:{
                idModule:props.data.id
            }
      }
        ).then((response) => {
            response.data.id? setDataDev(response.data):setDataDev(false);
        })
    }, []);
    const handleDelete = ()=>{
        axios.post("http://localhost:8080/modules/delete",{
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
    axios.post("http://localhost:8080/modules/update",{
      nameModule:nombre,
      descriptionModule:descripcion,
      idM: props.data.id,
    }).then(()=>window.location.reload())
    }
    return (
        <Card className="card-task">
            <Modal show={show=="edit"} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Modulo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Nombre</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeNombre} type="text" defaultValue={props.data.nameModule} placeholder="Nombre" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="align-items-center">
                    <Form.Label column className="moduloDet" xs={3}>Descripcion</Form.Label>
                    <Col>
                        <Form.Control onChange={handleChangeDesc} as="textarea" defaultValue={props.data.descriptionModule} rows={3} placeholder="Descripcion" />
                    </Col>
                </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSubmit}>
                        Enviar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show=="editAsig"} onHide={handleClose}>
                <EditAsig id={datadev.id} idModule={props.data.id}/>
            </Modal>
            <div className="card-body">
                <div className="card-title">
                    <h6 className="titlecard">{props.data.nameModule}</h6>
                    <span className="text-small">{props.data.descriptionModule}</span>
                </div>
                <div className="card-meta">
                    <div className="d-flex align-items-center">
                        <ul className="avatars">
                            {!datadev?null:
                            <li>
                                <a href={"/user/"+datadev.id} data-toggle="tooltip" data-placement="top" title="">
                                    <OverlayTrigger overlay={<Tooltip id="button-tooltip-2">{datadev.name+" "+datadev.apellido}</Tooltip>}>
                                        <img alt={datadev.name+" "+datadev.apellido} className="avatar"
                                            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"></img>
                                    </OverlayTrigger>
                                </a>
                            </li>}
                        </ul>
                        <Button onClick={()=>{setShow("editAsig")}} variant="round flex-shrink-0" data-target="#user-manage-modal">
                            <i className="material-icons">add</i>
                        </Button>
                    </div>
                    <DropdownButton id="testDropdown" drop={"left"} className="card-options" title={
                        <i className="material-icons">more_vert</i>
                    }>
                        <Dropdown.Item onClick={()=>{setShow("edit")}} >Editar</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleDelete}><span style={{color:"red"}}>Eliminar Modulo</span></Dropdown.Item>
                    </DropdownButton>
                </div>
            </div>
        </Card>

    )
}
export default Modulo;