import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Card, Col, Form, Spinner, Container, Row, Tab, Tabs, Nav, FormFile } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import DatosUsuario from "./partes_usuario/datos_usuario.js"
import CambiarContrasena from "./partes_usuario/cambiar_contraseña.js"
const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    useEffect(() => {
        axios.get("http://localhost:8080/users/profile",
            {
                headers:
                {
                    'token': localStorage.getItem('token')
                }
            }
        ).then(response => {
            let userResp={email:response.data.email,nombre:response.data.nombre,apellido:response.data.apellido,
                telefono:response.data.telefono,profilePic:response.data.profilePic}
            setUser(userResp);
            setLoading(false);
        });
    }, []);
    if (!isLogged) {
        return (
            <Redirect to="/login" />
        );
    }
    if (loading) {
        return <div></div>;
    }
        return (
            <Container>
                <Row className="justify-content-center mt-5">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Col lg={3} className="mb-3">
                            <Nav variant="tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">Tus Datos</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Cambiar Contraseña</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col lg={9} xl={8}>
                            <Card>
                                <Card.Body>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <DatosUsuario user={user}/>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <CambiarContrasena/>
                                        </Tab.Pane>

                                    </Tab.Content>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Tab.Container>

                </Row>

            </Container>
        );
}
export default Perfil;