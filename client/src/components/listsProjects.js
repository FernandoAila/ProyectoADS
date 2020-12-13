import React, { useState, useRef,useEffect} from "react";
import { login} from "../Redux/actions/auth";
import {Button,FormControl,ListGroup,Col,InputGroup,Row,Modal,Form} from "react-bootstrap"
import { useSelector, useDispatch} from "react-redux";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import { Link } from "react-router-dom";
const ListsProjects= (props)=>{

    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const [projects, setProjects] = useState([]);
    const [currentProject, setCurrentProject] = useState(null);
    const [requirements, setRequirements] = useState([
        { name: '', age: '' },
      ]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [show, setShow] = useState(false);
  
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
        <Row className="list">
            <Col md={8}>
                <InputGroup className="mb-3">
                    <FormControl placeholder="Buscar" type="text" 
                    value={searchTitle} onChange={onChangeSearchTitle}/>
                </InputGroup>
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={retrieveProjects}>Buscar</Button>{' '}
                    <Link to="projects/addproject">
                        <Button variant="outline-primary">
                                Añadir Proyecto
                            </Button>
                    </Link>
                </InputGroup.Append>
            </Col>
            <Col md={6}>
                <h5>Projectos</h5>
                <div className="mt-3">
                {"Items per Page: "}
                <select onChange={handlePageSizeChange} value={pageSize}>
                    {pageSizes.map((size) => (
                        <option key={size} value={size}>
                        {size}
                    </option>
                 ))}
                </select>
                <Pagination
                    className="my-3"
                    count={count}
                    page={page}
                    siblingCount={1}
                    boundaryCount={1}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                 />
                </div>
                <ListGroup as="ul">
                {projects &&
                    projects.map((project, index) => (
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