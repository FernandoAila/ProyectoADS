import { useSelector, useDispatch} from "react-redux";
import{Redirect} from "react-router-dom";
import axios from "axios";
import {Alert, Button, Card, Col, Form, Spinner} from "react-bootstrap";
import React, { useState, useRef,useEffect} from "react";

const Perfil= () =>{
    const [edit, setEdit] = useState(0);
    const [loading, setLoading] = useState(true);
    const [estado, setEstado] = useState('');
    const [email, setEmail] = useState("");
    const [nombre,setNombre]=useState("");
    const [apellido,setApellido]=useState("");
    const [telefono,setContacto]=useState("");
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    useEffect(() => {
        axios.get("http://localhost:8080/users/profile",
        {
            headers:
            {
                'userId':localStorage.getItem('userId')
            }
        }
        ).then(response => {
          setEmail(response.data.email);
          setNombre(response.data.nombre);
          setApellido(response.data.apellido);
          setContacto(response.data.telefono);
          setLoading(false);
        });
      }, []);
    if(!isLogged){
        return(
            <Redirect to="/login"  />
        );
    }

    const onChangeEdit = (e) => {
        const edit = e.target.value;
        setEdit(edit);
    };
    if (loading) {
        return <div></div>;
      }
    if(edit == 0){
        return(
            <Col md="13">
                <Card className="card card-container">
                    <Form >
                        <b>Tus datos</b>
                        <Form.Group controlId="formBasicEmail">
                            <label htmlFor="email">Email</label>
                            <Form.Control type="email" placeholder={email}readOnly/>
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <label htmlFor="nombre">Nombre</label>
                            <Form.Control type="name" placeholder={nombre} readOnly/>
                        </Form.Group>

                        <Form.Group controlId="formBasicSurname">
                            <label htmlFor="apellido">Apellido</label>
                            <Form.Control type="surname" placeholder={apellido} readOnly/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone">
                            <label htmlFor="telefono">Telefono</label>
                            <Form.Control type="phone" placeholder={telefono} readOnly/>
                        </Form.Group>

                        <Form.Group controlId="formBasicRol">
                            <label htmlFor="rol">Rol</label>
                            <Form.Control type="phone" placeholder="Rol" readOnly />
                        </Form.Group>
                        <h2>Modificar</h2>
                        <Button variant="warning" onClick={onChangeEdit} value={1}>Datos</Button>{' '}
                        <Button variant="warning" onClick={onChangeEdit} value={2}>Contraseña</Button>{' '}
                    </Form>
                </Card>
            </Col>
        );
    }else if(edit == 1) {
        return (
            <Col md="13">
                <Card className="card card-container">
                    <Form>
                        <b>Modifica tus datos personales</b>
                        <Form.Group controlId="formBasicEmail">
                            <label htmlFor="email">Email</label>
                            <Form.Control type="email" placeholder="mail"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <label htmlFor="nombre">Nombre</label>
                            <Form.Control type="name" placeholder="nombre"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicSurname">
                            <label htmlFor="apellido">Apellido</label>
                            <Form.Control type="surname" placeholder="apellido"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone">
                            <label htmlFor="telefono">Telefono</label>
                            <Form.Control type="phone" placeholder="telefono"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Verifique con su Contraseña</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña" />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" onClick={onChangeEdit} value={0}>Volver</Button>{' '}
                            <Button variant="warning" onClick={onChangeEdit} value={0}>Modificar</Button>{' '}
                        </Form.Group>

                    </Form>
                </Card>
            </Col>
        );
    }
    else if(edit==2){
        return(
            <Col md="13">
                <Card className="card card-container">
                    <Form>
                        <b>Cambia tu contraseña</b>
                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Contraseña antigua</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña antigua"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Contraseña nueva</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña nueva"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Verifique su ontraseña nueva</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña nueva"/>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" onClick={onChangeEdit} value={0}>Volver</Button>{' '}
                            <Button variant="warning" onClick={onChangeEdit} value={0}>Modificar</Button>{' '}
                        </Form.Group>

                    </Form>
                </Card>
            </Col>
        );
    }
}
export default Perfil;