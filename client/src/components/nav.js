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
      </Nav> 
      <Form inline>
      <Button onClick={handleLogout} variant="danger" type="button"> Logout </Button>
      </Form>
    </Navbar>
  );
}



  export default Navb