import axios from "axios";
import {  Button,  Col, Form, Row } from "react-bootstrap";
import React, { useState, Fragment } from "react";

const DatosUsuario = (props) => {
    const [email, setEmail] = useState(props.user.email);
    const [nombre, setNombre] = useState(props.user.nombre);
    const [apellido, setApellido] = useState(props.user.apellido);
    const [telefono, setTelefono] = useState(props.user.telefono);
    const [profilePic, setProfilePic] = useState(props.user.profilePic);
    const [file,setFile]=useState(null);
    const [password, setPassword] = useState("");
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
        const telefono = e.target.value;
        setTelefono(telefono);
    };
    const onChangePassword= (e)=>{
        const pass =e.target.value;
        setPassword(pass);
    }
    const handleCambiarDatos = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/users/modify', {
            token: localStorage.getItem('token'),
            email: email,
            nombre: nombre,
            oldpassword: password,
            apellido: apellido,
            telefono: telefono,
        }).then((data) => {
            console.log(data);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
    };
    const onFileChange = (e) => {
        const filePic = e.target.files[0];
        setFile(filePic);
    };
   const onFileUpload = () => { 
     
        // Create an object of formData 
        let formData = new FormData(); 
       
        // Update the formData object 
        formData.append( 
          "file", 
          file
        );
       
        // Details of the uploaded file 
        console.log(file);
        console.log(formData);
        axios.post('http://localhost:8080/users/uploadImage', formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              'token': localStorage.getItem('token')
            }
          }).then((resp)=>{
            localStorage.setItem('profilePic', resp.data.profilePic);
            window.location.reload();
          });
      }; 
    return (
        <Fragment>
            <div className="media mb-4">
                <img alt="image" src={profilePic} className="avatar avatar-lg">
                </img>
                <div className="ml-3">
                    <Form.File id="formcheck-api-regular">
                        <Form.File.Label className="input-pic">Seleccionar archivo</Form.File.Label>
                        <Form.File.Input onChange={onFileChange} hidden />
                    </Form.File>
                    <small>Para mejores resultados, utilizar imagen de 256x256 px, en formato .jpg o .png</small>
                </div>
                {file ? <Button onClick={onFileUpload}>Cambiar</Button> : null}
            </div>
            <Form>
                <Form.Group as={Row} controlId="formBasicEmail" className="align-items-center">
                    <Form.Label column sm="2">
                        Email
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="email" defaultValue={email} onChange={onChangeEmail} placeholder="Ingresar email" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formBasicName" className="align-items-center">
                    <Form.Label column sm="2">
                        Nombre
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="name" defaultValue={nombre} onChange={onChangeNombre} placeholder="Ingresar nombre" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formBasicSurname" className="align-items-center">
                    <Form.Label column sm="2">
                        Apellido
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="surname" defaultValue={apellido} onChange={onChangeApellido} placeholder="Ingresar apellido" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formBasicPhone" className="align-items-center">
                    <Form.Label column sm="2">
                        Telefono
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="phone" defaultValue={telefono} onChange={onChangeTelefono} placeholder="Ingresar telefono" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="formBasicPassword" className="align-items-center">
                    <Form.Label column sm="2">
                        Verifique con su contraseña
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="password" onChange={onChangePassword} placeholder="Ingresar contraseña" />
                    </Col>
                </Form.Group>
                <div class="d-flex justify-content-end">
                          <Button variant="primary" onClick={handleCambiarDatos}>Modificar datos</Button>
                </div>
            </Form>
        </Fragment>
    )
}
export default DatosUsuario;