import React, { useState,useRef } from "react";
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch} from "react-redux";
import { Button, Form, Alert, Col, Card, Image, Spinner } from 'react-bootstrap';
import { login } from "../Redux/actions/auth";
import axios from 'axios';


const RecoverPass = (props) => {
    const form = useRef();
    const [passwordConfirmation, setPassConf] = useState("");
    const [password, setPassword] = useState("");
    const [estado, setEstado] = useState(false);
    const [loading, setLoading] = useState(false);
    const data=useParams();
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const dispatch = useDispatch();

    const onChangeConfirmation = (e) => {
        const pass = e.target.value;
        setPassConf(pass);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const validateForm = () => {
        return passwordConfirmation.length > 0 && password.length > 0;
    }
    const handleChange = (e) => {
        e.preventDefault();
        if (password!=passwordConfirmation) {
            console.log(data);
            setEstado("noCoinciden");
        }
        else {

            setLoading(true);
            let url='http://localhost:8080/auth/change_passFirst/'+data.id+"/"+data.token;
            axios.post(url, {
                password: password,
            }).then(() => {
                console.log("ok")
                setLoading(false);
                setEstado("CambioCorrecto");
            }).catch(() => {
                setLoading(false);
            });
        }

    };

    //if (isLogged) {
    //    return <Redirect to="/perfil" />;
    //}

    return (
        <Col md="12">
            <Card className="card card-container">
                <Form ref={form}>

                    <Form.Group controlId="formBasicPassword">
                        <label htmlFor="password">Contraseña</label>
                        <Form.Control type="password" placeholder="Ingresar contraseña"
                            value={password} onChange={onChangePassword} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <label htmlFor="password">Verificar Contraseña</label>
                        <Form.Control type="password" placeholder="Ingresar contraseña"
                            value={passwordConfirmation} onChange={onChangeConfirmation} />
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" block onClick={handleChange} type="submit" disabled={!validateForm() && !loading}>
                            {loading ? <Spinner animation="border" role="status">
                                <span className="sr-only">Cargando</span>  </Spinner>
                                : <span>Ingresar</span>
                            }
                        </Button>
                    </Form.Group>
                    {estado=="noCoinciden" && <Alert variant="danger">Las Contraseñas no coinciden
                </Alert>}
                {estado=="CambioCorrecto" && <Alert variant="success">Cambio realizado correctamente
                </Alert>}
                </Form>
            </Card>
        </Col>
    );
};

export default RecoverPass;