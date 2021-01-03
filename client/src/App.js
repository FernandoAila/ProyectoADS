import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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
      <Route path="/register">
        <Navb/>
        <Register/>
      </Route>
      <Route path="/projects/addproject">
        <Navb/>
        <AddProyect/>
      </Route>
      <Route path="/projects/:id">
        <Navb/>
        <MostrarProyecto/>
      </Route>
      <Route path="/projects">
        <Navb/>
        <ListsProjects/>
      </Route>
      <Route path="/modules">
        <Navb/>
        <NoCotizadosModulos/>
      </Route>
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