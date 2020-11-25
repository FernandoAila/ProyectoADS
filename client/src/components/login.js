import React, { useState, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect} from 'react-router-dom';
import {Button,Form,Alert,Col,Card,Image,Spinner} from 'react-bootstrap';
import { login} from "../Redux/actions/auth";
import {redirect} from "../Redux/actions/redirect.js";
import axios from 'axios';


const Login = (props) => {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [estado, setEstado] = useState('');
  const [loading, setLoading] = useState(false);

  const isLogged = useSelector((store) => store.authReducer.isLogged);
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const validateForm=()=>{
    return email.length > 0 && password.length > 0;
  }
  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    axios.post('http://localhost:8080/auth/login', {
        email: email,
        pass: password,
      }).then((data) => {
        console.log(data);
        dispatch(login(data));
        localStorage.setItem('token', data.data.accessToken);
        window.location.reload();
        dispatch(redirect("/home"));
      }).catch(()=>{
        setEstado(true);
        setLoading(false);
      });

  };

  if (isLogged) {
    return <Redirect to="/perfil" />;
  }

  return (
    <Col md="12">
      <Card className="card card-container">
        <Image src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" roundedCircle className="profile-img-card" />
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

            <Form.Group>
                <Button variant="primary" block onClick={handleLogin} type="submit" disabled={!validateForm()&&!loading}>
                  {loading ? <Spinner animation="border" role="status">
                    <span className="sr-only">Cargando</span>  </Spinner>
                    :<span>Ingresar</span> 
                  }
                </Button>
            </Form.Group>
            {estado &&  <Alert variant="danger">Usuario o contraseña incorrecta
                </Alert>}
        </Form>
        </Card>
        </Col>
  );
};

export default Login;