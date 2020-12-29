import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,Redirect} from 'react-router-dom';
import {logout} from "../Redux/actions/auth.js";
import { Navbar, Nav, Form, FormControl, Button,DropdownButton,Dropdown } from 'react-bootstrap';
const Navb=()=>{
  const history = useHistory();
  const dispatch=useDispatch();
  const handleLogout=(e)=>{
      dispatch(logout());
      window.location.reload();
  }
  const isLogged = useSelector((store) => store.authReducer.isLogged);
  if(!isLogged){
    return(
        <Redirect to="/login"  />
    );
}
  return(
      <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
      <Navbar.Brand href="#home">
       N
      </Navbar.Brand>
      <Nav className="mr-auto">
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                  <a class="nav-item options nav-link active" href="#">Home <span class="sr-only">(current)</span></a>
                  <a class="nav-item options nav-link" href="/perfil">Perfil</a>
                  <a class="nav-item options nav-link" href="/register">Registro</a>
                  <a className="nav-item options nav-link" href="/projects">Proyectos</a>
                  <a className="nav-item options nav-link" href="/modules">Modulos</a>
              </div>
          </div>
      </Nav>
      <div className="d-flex align-items-center">
              <DropdownButton className="doa" variant="xd" drop="left"  title={<img alt="Image" src={localStorage.getItem('profilePic')} class="avatar"></img>} >
                <Dropdown.Item href={"/user/"+localStorage.getItem("userId")}>Perfil</Dropdown.Item>
                <Dropdown.Item href="/perfil">Cuenta</Dropdown.Item>
                
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={handleLogout}>Cerrar sesion</Dropdown.Item>
              </DropdownButton>
          </div>
    </Navbar>
  );
}



  export default Navb;