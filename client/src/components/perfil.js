import { useSelector, useDispatch} from "react-redux";
import{Redirect} from "react-router-dom";
import axios from "axios";
import {Alert, Button, Card, Col, Form, Spinner} from "react-bootstrap";
import React, { useState, useRef,useEffect} from "react";

const Perfil= () =>{
    const [edit, setEdit] = useState(0);
    const [loading, setLoading] = useState(true);
    const [estado, setEstado] = useState(false);
    const [email, setEmail] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword1, setNewPassword1] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [nombre,setNombre]=useState("");
    const [apellido,setApellido]=useState("");
    const [telefono,setTelefono]=useState("");
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    useEffect(() => {
        axios.get("http://localhost:8080/users/profile",
        {
            headers:
            {
                'token':localStorage.getItem('token')
            }
        }
        ).then(response => {
          setEmail(response.data.email);
          setNombre(response.data.nombre);
          setApellido(response.data.apellido);
         setTelefono(response.data.telefono);
          setLoading(false);
        });
      }, []);
    if(!isLogged){
        return(
            <Redirect to="/login"  />
        );
    }
    const onChangeEdit = (e) => {
        const nombre = e.target.value;
        setEstado(0);
        setEdit(nombre);
    };
    const onChangeNombre = (e) => {
        const nombre = e.target.value;
        setNombre(nombre);
    };
    const onChangeApellido = (e) => {
        const apellido = e.target.value;
        setApellido(apellido);
    };
    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangeTelefono = (e) => {
        const telefono= e.target.value;
        setTelefono(telefono);
    };
    const onChangeOldPassword= (e)=>{
        const pass =e.target.value;
        setOldPassword(pass);
    }
    const onChangeNewPassword=(e)=>{
        const pass = e.target.value;
        setNewPassword(pass);
    }
    const onChangeNewPassword1=(e)=>{
        const pass = e.target.value;
        setNewPassword1(pass);
    }
    const handleCambiarDatos=(e)=>{
        e.preventDefault();
        axios.post('http://localhost:8080/users/modify', {
            token:localStorage.getItem('token'),
            email: email,
            nombre: nombre,
            oldpassword:oldpassword,
            apellido: apellido,
            telefono: telefono,
        }).then((data) => {
            console.log(data);
            window.location.reload();
        }).catch((err)=>{
            console.log(err);
        });
    };
    const handleCambiarPass=(e)=>{
        e.preventDefault();
        if(newpassword==newpassword1){
            axios.post('http://localhost:8080/users/passUpdate', {
            oldpassword:oldpassword,
            newpassword:newpassword,
            token:localStorage.getItem('token')
        }).then((data) => {
            console.log(data);
            setEdit(0);
            setEstado(1);
        }).catch((err)=>{
            console.log(err);
            setEstado(2);
        });
        }
        else{
            setEstado(3);
        }
    }
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
                            <Form.Control type="email" placeholder="mail" onChange={onChangeEmail}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <label htmlFor="nombre">Nombre</label>
                            <Form.Control type="name" placeholder="nombre" onChange={onChangeNombre}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicSurname">
                            <label htmlFor="apellido">Apellido</label>
                            <Form.Control type="surname" placeholder="apellido" onChange={onChangeApellido}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPhone">
                            <label htmlFor="telefono">Telefono</label>
                            <Form.Control type="phone" placeholder="telefono" onChange={onChangeTelefono}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Verifique con su Contraseña</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña" onChange={onChangeOldPassword} />
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" onClick={onChangeEdit} value={0}>Volver</Button>{' '}
                            <Button variant="warning" onClick={handleCambiarDatos} value={0}>Modificar</Button>{' '}
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
                        {estado==1 &&  <Alert variant="danger">Error al cambiar la contraseña
                </Alert>}
                {estado==2 &&  <Alert variant="danger">La contraseña nueva no coincide
                </Alert>}
                {estado==3 &&  <Alert variant="success">Contraseña cambiada exitosamente
                </Alert>}
                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Contraseña antigua</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña antigua" onChange={onChangeOldPassword}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Contraseña nueva</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña nueva" onChange={onChangeNewPassword}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <label htmlFor="password">Verifique su ontraseña nueva</label>
                            <Form.Control type="password" placeholder="Ingresar contraseña nueva" onChange={onChangeNewPassword1}/>
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