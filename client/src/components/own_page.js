import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect, useParams } from 'react-router-dom';
import Modulo from "./partes_usuario/modulo.js"
import Reunion from "./partes_usuario/reunion.js"
import { Container, Image, InputGroup, Form, Row, Col,Tab,Tabs } from "react-bootstrap";
const OwnPage = () => {
    const [searchname, setSearch] = useState("");
    const [user, setUser] = useState({});
    const [modules, setModules] = useState([]);
    const [reunions, setReunions] = useState([]);
    let { id } = useParams();
    const onChangeSearch = (e) => {
        const searchname = e.target.value;
        setSearch(searchname);
    };
    const filterResult = modules.filter(modulo => {
        return modulo.nameModule.toLowerCase().includes(searchname.toLowerCase())
    })
    useEffect(() => {
        axios.get("http://localhost:8080/users/profileinfo", {
            params: {
                id: id
            }
        }
        ).then((response) => {
            setUser(response.data);
        });
        axios.get("http://localhost:8080/modulesRoutes/AllDevAsssigned", {
            params: {
                id: id
            }
        }
        ).then(response => {
            setModules(response.data);
        });
        axios.get("http://localhost:8080/reunionsRoutes/allmyReunions", {
            headers:
            {
                'token': localStorage.getItem('token')
            }
        }
        ).then(response => {
            console.log(response.data);
            setReunions(response.data);
          
        });
    }, []);
    return (
        <Container>

            <Row className="justify-content-center">
                <Col lg={11} xl={10}>
                    <div className="page-header mb-4">
                        <div className="media">
                            <Image alt="Image" src={user.profilePic} className="avatar avatar-lg mt-1">
                            </Image>
                            <div class="media-body ml-3">
                                <h1 class="namePerfil">{user.nombre + " " + user.apellido}</h1>
                                <p class="lead">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    
                    <Tabs defaultActiveKey="modulos" fill>
                        <Tab eventKey="modulos" title="Modulos">
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
                            <div className="content-list-body">
                                <div className="card-list-head">
                                    <h6>Modulos Activos</h6>
                                </div>
                                <div className="card-list-body">
                                    {filterResult.map((item) => <Modulo key={item.id} data={item} datadev={user} />)}
                                </div>
                            </div>
                        </Tab>

                        <Tab eventKey="reuniones" title="Reuniones">
                              <Col md="auto">

                            </Col>
                            <div className="content-list-body">
                                <div className="card-list-head">
                                    <h6>Reuniones Futuras</h6>
                                </div>
                                <div className="card-list-body">
                                    {reunions.map( (reunions,index) => (
                                        <Reunion reunions={reunions} key={index} />
                                    ))}
                                </div>
                            </div>
                        </Tab>
                    </Tabs>
                        
                </Col>
            </Row>
        </Container>

    );
}
export default OwnPage;