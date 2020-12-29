import React, { Fragment, useEffect, useState } from "react";
import { OverlayTrigger, Tooltip, Form, Button, Modal, InputGroup } from "react-bootstrap";
import axios from "axios";
const EditAsig = (props) => {
    const [interns, setInterns] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [asign, setAsign] = useState("");
    const handleSearchChange = (e) => {
            setSearchTerm(e.target.value);
        }
        const filterResult=interns.filter( intern=>{
            return intern.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || intern.apellido.toLowerCase().includes(searchTerm.toLowerCase())
        })
    useEffect(() => {
            axios.get("http://localhost:8080/users/AllInterns"
            ).then((response) => {
                setInterns(response.data);
            })
        }, []);
        const handleSubmit = (e) => {
            if(props.id){
                axios.post("http://localhost:8080/modulesRoutes//ReAssignDeveloper", {
                    idModule:props.idModule,
                    id:asign
                }).then( ()=>window.location.reload()
                );
            }
            else{
                axios.post("http://localhost:8080/modulesRoutes/AssignDeveloper", {
                    idModule: props.idModule,
                    id: asign
                }).then(() => { window.location.reload() })
            }
            }
    return (
        <Fragment>
            <Modal.Header closeButton>
                <Modal.Title>Editar Asignacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>

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


                    {filterResult.map((item) =>
                        <div key={item.id} className="custom-control custom-checkbox">
                            <span className="d-flex align-items-center">
                                <img alt={item.nombre + " " + item.apellido} src={item.profilePic} className="avatar mr-2"></img>
                                <span className="h6 mb-0 nolinebreak" data-filter-by="text">{item.nombre + " " + item.apellido}</span>
                                <Form.Check defaultChecked={item.id==props.id}  value={item.id} onChange={(e) => { setAsign(e.target.value) }} name="test" type="radio" className="checkbox-asig" id={item.id} />
                            </span>
                        </div>
                    )}
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button  variant="primary" onClick={handleSubmit}>
                    Guardar
                    </Button>
            </Modal.Footer>
        </Fragment>
    )
}
export default EditAsig;