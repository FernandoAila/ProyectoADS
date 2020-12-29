import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Card, Col, Form, Spinner, Container, Row, Tab, Tabs, Nav, FormFile } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import DatosUsuario from "./partes_usuario/datos_usuario.js"
const Perfil = () => {
    const [edit, setEdit] = useState(0);
    const [loading, setLoading] = useState(true);
    const [estado, setEstado] = useState(false);
    const [user, setUser] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword1, setNewPassword1] = useState("");
    const [newpassword, setNewPassword] = useState("");
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
    const onChangeEdit = (e) => {
        const nombre = e.target.value;
        setEstado(0);
        setEdit(nombre);
    };
    const onChangeOldPassword = (e) => {
        const pass = e.target.value;
        setOldPassword(pass);
    }
    const onChangeNewPassword = (e) => {
        const pass = e.target.value;
        setNewPassword(pass);
    }
    const onChangeNewPassword1 = (e) => {
        const pass = e.target.value;
        setNewPassword1(pass);
    }
    const handleCambiarPass = (e) => {
        e.preventDefault();
        if (newpassword == newpassword1) {
            axios.post('http://localhost:8080/users/passUpdate', {
                oldpassword: oldpassword,
                newpassword: newpassword,
                token: localStorage.getItem('token')
            }).then((data) => {
                console.log(data);
                //setEdit(0);
                setEstado(3);
            }).catch((err) => {
                console.log(err);
                setEstado(1);
            });
        }
        else {
            setEstado(3);
        }
    }
    if (loading) {
        return <div></div>;
    }
    if (edit == 0) {
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

                                    </Tab.Content>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Tab.Container>

                </Row>

            </Container>
        );
    }
    else if (edit == 2) {
        return (
            <Col md="13">
                <Card className="card card-container">
                    <Form>
                        <b>Cambia tu contraseña</b>
                        {estado == 1 && <Alert variant="danger">Error al cambiar la contraseña
                </Alert>}
                        {estado == 2 && <Alert variant="danger">La contraseña nueva no coincide
                </Alert>}
                        {estado == 3 && <Alert variant="success">Contraseña cambiada exitosamente
                </Alert>}
                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Contraseña antigua</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña antigua" onChange={onChangeOldPassword} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Contraseña nueva</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña nueva" onChange={onChangeNewPassword} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Verifique su ontraseña nueva</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña nueva" onChange={onChangeNewPassword1} />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" onClick={onChangeEdit} value={0}>Volver</Button>{' '}
                            <Button variant="warning" onClick={handleCambiarPass} value={0}>Modificar</Button>{' '}
                        </Form.Group>

                    </Form>
                </Card>
            </Col>
        );
    }
}
export default Perfil;