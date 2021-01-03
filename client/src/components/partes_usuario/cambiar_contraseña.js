import React, { useState,useRef } from "react";
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';


const RecoverPass = (props) => {
    const form = useRef();
    const [passwordConfirmation, setPassConf] = useState("");
    const[password,setNewPassword]=useState("")
    const [oldpassword, setPassword] = useState("");
    const [estado, setEstado] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChangeConfirmation = (e) => {
        const pass = e.target.value;
        setPassConf(pass);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setNewPassword(password);
    };
    const onChangeOldPassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };
    const validateForm = () => {
        return passwordConfirmation.length > 0 && password.length > 0;
    }
    const handleChange = (e) => {
        e.preventDefault();
        if (password!=passwordConfirmation) {
            setEstado("noCoinciden");
        }
        else{
            axios.post('http://localhost:8080/users/passUpdate', {
                oldpassword: oldpassword,
                newpassword: password,
                token: localStorage.getItem('token')
            }).then((data) => {
                console.log(data);
                //setEdit(0);
            }).catch((err) => {
                console.log(err);
            });
        }
    };


    return (
                <Form ref={form}>

                    <Form.Group controlId="formBasicPassword">
                        <label htmlFor="password">Contraseña actual</label>
                        <Form.Control type="password" placeholder="Ingresar contraseña"
                            value={oldpassword} onChange={onChangeOldPassword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <label htmlFor="password">Nueva Contraseña</label>
                        <Form.Control type="password" placeholder="Ingresar contraseña"
                            value={password} onChange={onChangePassword} />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <label htmlFor="password">Verificar contraseña nueva</label>
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
    );
};

export default RecoverPass;