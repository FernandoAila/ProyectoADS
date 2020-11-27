import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import {logout} from "../Redux/actions/auth.js";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
const Navb=()=>{
  const history = useHistory();
  const dispatch=useDispatch();
  const handleLogout=(e)=>{
      dispatch(logout());
      window.location.reload();
  }
  return(
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                  <a class="nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                  <a class="nav-item nav-link" href="/perfil">Perfil</a>
                  <a class="nav-item nav-link" href="/register">Registro</a>
                  <a className="nav-item nav-link" href="/create_modules">Crear Modulo</a>
                  <a className="nav-item nav-link" href="/my_modules">Mis Modulos</a>
                  <a class="nav-item nav-link disabled" href="#">Disabled</a>
              </div>
          </div>
      </Nav>
      <Form inline>
      <Button onClick={handleLogout} variant="danger" type="button"> Logout </Button>
      </Form>
    </Navbar>
  );
}



  export default Navb