import React,{ useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory,Redirect} from 'react-router-dom';
import {logout} from "../Redux/actions/auth.js";
import AddReunion from "./partes_proyecto/crear_reunion";
import EnviarMensaje from "./partes_proyecto/enviar_mensaje";
import { Navbar, Nav, Modal,Form, FormControl, Button,DropdownButton,Dropdown } from 'react-bootstrap';
const Navb=(props)=>{
  const history = useHistory();
  const [show, setShow] = useState(false);
  const dispatch=useDispatch();
  const handleLogout=(e)=>{
      dispatch(logout());
      window.location.reload();
  }
  const handleClose= ()=> setShow(false);
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
                  { (localStorage.getItem("rol")==2|| localStorage.getItem("rol")==1) &&  <a class="nav-item options nav-link" href="/register">Registrar Usuario</a>}
                  {(localStorage.getItem("rol")==2|| localStorage.getItem("rol")==1)&&<a className="nav-item options nav-link" href="/projects">Proyectos</a>}
                  {(localStorage.getItem("rol")==4||localStorage.getItem("rol")==1)&&<a className="nav-item options nav-link" href="/modules">Modulos Disponibles</a>}
              </div>
          </div>
      </Nav>
      <div className="d-flex align-items-center">
          <div>
          {(localStorage.getItem("rol")==2|| localStorage.getItem("rol")==1) &&<Button variant="outline-primary" className="button-Reunion" onClick={()=>{setShow("Mensaje")}}>
                                            Enviar mensaje
                                        </Button>}
      {(localStorage.getItem("rol")==2|| localStorage.getItem("rol")==1) &&<Button variant="outline-secondary" className="button-Reunion" onClick={()=>{setShow("Reunion")}}>
                                            Crear Reunion
                                        </Button>}
          </div>

              <DropdownButton className="doa" variant="xd" drop="left"  title={<img alt="Image" src={localStorage.getItem('profilePic')} class="avatar"></img>} >
                <Dropdown.Item href={"/user/"+localStorage.getItem("userId")}>Perfil</Dropdown.Item>
                <Dropdown.Item href="/perfil">Cuenta</Dropdown.Item>
                
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item onClick={handleLogout}>Cerrar sesion</Dropdown.Item>
              </DropdownButton>
          </div>
          <Modal show={show=="Reunion"} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crear Reunion</Modal.Title>
                </Modal.Header>
                    <AddReunion/>
            </Modal>
            <Modal show={show=="Mensaje"} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enviar mensaje</Modal.Title>
                </Modal.Header>
                    <EnviarMensaje/>
            </Modal>
    </Navbar>
  );
}



  export default Navb;