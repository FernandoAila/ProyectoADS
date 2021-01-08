import React, { useState, useRef,useEffect} from "react";
import { login} from "../Redux/actions/auth";
import {Button,FormControl,ListGroup,Col,InputGroup,Row,Modal,Form} from "react-bootstrap"
import { useSelector, useDispatch} from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import AddProyect from "./add_proyect.js"
import { Link } from "react-router-dom";
const ListsProjects= (props)=>{

    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [search,setSearch]=useState("");
    const [show, setShow] = useState(false);
    const onChangeSearch = (e) => {
      const searchname = e.target.value;
      setSearch(searchname);
    };
    const filterResult= projects.filter( project=>{
      return project.nameProject.toLowerCase().includes(search.toLowerCase())
  })
    const pageSizes = [3, 6, 9];

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onChangeSearchTitle = (e) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
      };
    const getRequestParams = (searchTitle, page, pageSize) => {
        let params = {};
    
        if (searchTitle) {
          params["title"] = searchTitle;
        }
    
        if (page) {
          params["page"] = page - 1;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
      };

      const retrieveProjects = () => {
        const params = getRequestParams(searchTitle, page, pageSize);
        axios.get('http://localhost:8080/projects/all', {
            params
        }).then((response) => {
            const { projects, totalPages } = response.data;
    
            setProjects(projects);
            setCount(totalPages);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      useEffect(retrieveProjects, [page, pageSize]);
      const handlePageChange = (event, value) => {
        setPage(value);
      };

      const refreshList = () => {
        retrieveProjects();
        setCurrentProject(null);
        setCurrentIndex(-1);
      };
      const handlePageSizeChange = (event) => {
        setPageSize(event.target.value);
        setPage(1);
      };
      const setActiveProject = (project, index) => {
        setCurrentProject(project);
        setCurrentIndex(index);
      };
    return(
        <>
        <Row className="list mb-4">
        <Modal show={show} onHide={handleClose}>
            <AddProyect/>
            </Modal>
            <Col md={6}>
                <h3>Projectos</h3>
                <div className="mt-3">
                {"Items por pagina: "}
                <select onChange={handlePageSizeChange} value={pageSize}>
                    {pageSizes.map((size) => (
                        <option key={size} value={size}>
                        {size}
                    </option>
                 ))}
                </select>
                <div>
                <Pagination
                    className="my-3"
                    style={{float:"left"}}
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                 />
                                         <Button className="addp" style={{float:"left"}} onClick={handleShow} variant="outline-primary">
                                Añadir Proyecto
                            </Button>
                            </div>
                                 <InputGroup className="input-group-round mb-4">
                                 <InputGroup.Prepend>
                            <InputGroup.Text>
                                <i className="material-icons">filter_list</i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                    <FormControl placeholder="Buscar" type="text" 
                     onChange={onChangeSearch}/>
                </InputGroup>
                </div>
                <ListGroup as="ul">
                {projects &&
                    filterResult.map((project, index) => (
                <ListGroup.Item as="li"
                    className={
                    (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveProject(project, index)}
                    key={index}
                >
                {project.nameProject}
                </ListGroup.Item>
            ))}
                </ListGroup>
            </Col>
            <Col md={6}>
            {currentProject ? (
          <div>
            <h4>Projecto</h4>
            <div>
              <label>
                <strong>Titulo</strong>
              </label>{" "}
              {currentProject.nameProject}
            </div>
            <div>
              <label>
                <strong>Descripcion</strong>
              </label>{" "}
              {currentProject.descriptionProject}
            </div>
            <Link
              to={"/projects/"+currentProject.id}
            >
              <Button variant="primary">Mostrar proyecto</Button>
            </Link>
          </div>
        ) : (
          <div>
          </div>
        )}
            </Col>
            </Row>
    </>
    )
}
export default ListsProjects;