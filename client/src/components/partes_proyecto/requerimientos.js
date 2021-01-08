import React, { Fragment, useState } from "react";
import { Form, Button, Row, Col, Modal, InputGroup} from "react-bootstrap";
import AddReq from "./add_req.js";
import Requerimiento from "./requerimiento.js";
const ReqList = (props) => {
    const [show, setShow] = useState(false);
    const [search,setSearch]=useState("");
    const handleShow = () => setShow(true);
    const handleClose= ()=> setShow(false);
    const onChangeSearch = (e) => {
        const searchname = e.target.value;
        setSearch(searchname);
      };
    const filterResult= props.reqs.filter( req=>{
        return req.nameRequirement.toLowerCase().includes(search.toLowerCase())
    })
    return (
        <Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Añadir Requerimiento</Modal.Title>
                </Modal.Header>
                    <AddReq projectId={props.projectId}/>
            </Modal>
            <Row className="content-list-head">
                <Col xs="auto">
                    <h3>Requerimientos</h3>
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
                        <Form.Control onChange={onChangeSearch} className="filter-list-input" type="search" placeholder="Filtrar Requerimientos" />
                    </InputGroup>
                </Col>

            </Row>
            <div className="content-list-body">
                <div className="card-list">
                    <div className="card-list-head">
                        <h6>Requerimientos Activos</h6>
                    </div>
                    <div className="card-list-body">
                        {filterResult.map( (item)=> <Requerimiento key={item.id} data={item}/>)}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ReqList;