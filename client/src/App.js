import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios"
import React, { useState,useEffect } from "react";
import Login from "./components/login.js";
import Perfil from "./components/perfil.js";
import Navb from "./components/nav.js"
import Index from "./components/index.js"
import Register from "./components/register.js"
import ListsProjects from "./components/listsProjects.js"
import AddProyect from "./components/add_proyect.js"
import  MostrarProyecto   from "./components/project.js";
import NoCotizadosModulos from "./components/modulos_no_cotizados.js";
import PaginaUsuario from "./components/pagina_usuario.js";
import RecoverPass from "./components/recoverPass.js";
import{BrowserRouter as Router, Switch,Route,Link}from 'react-router-dom';

function App() {
  const [rol, setRol] = useState(localStorage.getItem("rol"));
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
      <Route path="/user/:id">
        <Navb/>
        <PaginaUsuario/>
      </Route>
      {(rol==1||rol==2) &&
      <Route path="/register">
        <Navb/>
        <Register/>
      </Route>
      }
      {(rol==1||rol==2) &&
      <Route path="/projects/addproject">
        <Navb/>
        <AddProyect/>
      </Route>
}
      {(rol==1||rol==2) &&
      <Route path="/projects/:id">
        <Navb/>
        <MostrarProyecto/>
      </Route>
}
    {(rol==1||rol==2) &&
      <Route path="/projects">
        <Navb/>
        <ListsProjects/>
      </Route>
    }
        {(rol==4||rol==1) &&
      <Route path="/modules">
        <Navb/>
        <NoCotizadosModulos/>
      </Route>
          }
      <Route path="/recover_pass/:id/:token">
        <RecoverPass/>
      </Route>
      <Route path="/">
        <Index/>
      </Route>
    </Switch>
  </Router>
  );
}

export default App;