import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Form} from 'react-bootstrap';
import { useState } from 'react';

function App() {
  //MUY Probablemente se mueva el login a un archivo separado 
  const [email,setEmail]= useState("");
  const [password,setPassword]=useState("");
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }
  function handleSubmit(event) {
        event.preventDefault();
  }
  return (
      <Form className="login-form">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Nombre de Usuario</Form.Label>
        <Form.Control type="email" placeholder="Ingresar usuario" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>
    
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" placeholder="Ingresar contraseña" value={password} onChange={e => setPassword(e.target.value)}/>
      </Form.Group>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Recordar" />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!validateForm()}>
        Ingresar
      </Button>
    </Form>
  );
}

export default App;
