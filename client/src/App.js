import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Form} from 'react-bootstrap';
import { useState } from 'react';
import axios from "axios";
import Login from "./components/login.js";
import Perfil from "./components/perfil.js";
import Navb from "./components/nav.js"
import Index from "./components/index.js"
import Register from "./components/register.js"
import ListsProjects from "./components/listsProjects.js"
import AddProyect from "./components/add_proyect.js"
import  ShowProject   from "./components/showProyect.js";
import{BrowserRouter as Router, Switch,Route,Link}from 'react-router-dom';

function App() {
  return(
  <Router>
    <Switch>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/perfil">
        <Navb/>
        <Perfil/>
      </Route>
      <Route path="/register">
        <Navb/>
        <Register/>
      </Route>
      <Route path="/projects/:id">
        <Navb/>
        <ShowProject/>
      </Route>
      <Route path="/projects">
        <Navb/>
        <ListsProjects/>
      </Route>
      <Route path="/projects/addproyect">
        <Navb/>
        <AddProyect/>
      </Route>
      <Route path="/">
        <Index/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;