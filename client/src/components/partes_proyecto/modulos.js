import React, { Fragment, useState } from "react";
import { Form, Button, Row, Col, Modal, InputGroup} from "react-bootstrap";
import AddModulo from "./add_modulo.js";
import Modulo from "./modulo.js";
const ModulosList = (props) => {
    const [show, setShow] = useState(false);
    const [search,setSearch]=useState("");
    const handleShow = () => setShow(true);
    const handleClose= ()=> setShow(false);
    const onChangeSearch = (e) => {
        const searchname = e.target.value;
        setSearch(searchname);
      };
    const filterResult= props.modules.filter( modulo=>{
        return modulo.nameModule.toLowerCase().includes(search.toLowerCase())
    })
    return (
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Modulo</Modal.Title>
                </Modal.Header>
                    <AddModulo projectId={props.projectId}/>
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
                        <Form.Control onChange={onChangeSearch} className="filter-list-input" type="search" placeholder="Filtrar Modulos" />
                    </InputGroup>
                </Col>

            </Row>
            <div className="content-list-body">
                <div className="card-list">
                    <div className="card-list-head">
                        <h6>Modulos Activos</h6>
                    </div>
                    <div className="card-list-body">
                        {filterResult.map( (item)=> <Modulo key={item.id} data={item}/>)}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ModulosList;