import React, { useState, useRef} from "react";
import axios from "axios";
import {Alert, Button, Card, Col, Form, Spinner} from "react-bootstrap";
const Register=(props)=>{
    const form = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [rol, setRol] = useState(1);

    const [loading, setLoading] = useState(false);
    const [estado, setEstado] = useState('');

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeNombre = (e) => {
        const nombre = e.target.value;
        setNombre(nombre);
    };

    const onChangeApellido = (e) => {
        const apellido = e.target.value;
        setApellido(apellido);
    };

    const onChangeTelefono = (e) => {
        const telefono = e.target.value;
        setTelefono(telefono);
    };

    const onChangeRol = (e) => {
        const rola = e.target.value;
        let rolnum=0;
        switch (rola) {
            case 'Jefe de proyecto':
                rolnum='2';
                break;
            case 'Desarrollador':
                rolnum='3';
                break;
            case 'freelance':
                rolnum='4';
                break;
            case 'Cliente':
                rolnum='5';
                break;
          };
        setRol(rolnum);
    };

    const validateForm = (e) => {
        return email.length > 0 && password.length > 0 && nombre.length > 0 && apellido.length > 0 && telefono.length > 0;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        //se cambia el valor de texto del rol al valor numerico que tiene el rol como id.

        axios.post('http://localhost:8080/auth/register', {
            email: email,
            password: password,
            nombre: nombre,
            apellido: apellido,
            telefono: telefono,
            rol: rol,
        }).then((data) => {
            console.log(data);
            setEstado(true);
            setLoading(false);
        }).catch(()=>{
            setLoading(false);
        });

    };
    return (
        <Col md="13">
            <Card className="card card-container">
                {estado && <Alert variant="success">Registro Exitoso
                    </Alert>}
                <Form  ref={form}>
                    <Form.Group controlId="formBasicEmail">
                        <label htmlFor="email">Email</label>
                        <Form.Control type="email" placeholder="Ingresar email"
                                      value={email} onChange={onChangeEmail} />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <label htmlFor="password">Contraseña</label>
                        <Form.Control type="password" placeholder="Ingresar contraseña"
                                      value={password} onChange={onChangePassword}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <label htmlFor="nombre">Nombre</label>
                        <Form.Control type="name" placeholder="Ingresar Nombre"
                                      value={nombre} onChange={onChangeNombre}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicSurname">
                        <label htmlFor="apellido">Apellido</label>
                        <Form.Control type="surname" placeholder="Ingresar apellido"
                                      value={apellido} onChange={onChangeApellido}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <label htmlFor="telefono">Telefono</label>
                        <Form.Control type="phone" placeholder="Ingresar telefono"
                                      value={telefono} onChange={onChangeTelefono}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control as="select" defaultValue="Rol" onChange={onChangeRol}>
                            <option eventKey="Jefe de proyecto">Jefe de proyecto</option>
                            <option eventKey="Desarrollador">Desarrollador</option>
                            <option eventKey="freelance">Freelance</option>
                            <option eventKey="Cliente">Cliente</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" block onClick={handleRegister} type="submit" disabled={!validateForm()&&!loading}>
                            {loading ? <Spinner animation="border" role="status">
                                    <span className="sr-only">Cargando</span>  </Spinner>
                                :<span>Registrar</span>
                            }
                        </Button>
                    </Form.Group>
                </Form>
            </Card>
        </Col>

    );
};

export default Register;