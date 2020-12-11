import React, { useState, useRef,useEffect} from "react";
import { ListGroup,Accordion,Card,FormControl,Form,Button,Row,Col,Table,Modal} from "react-bootstrap";
import axios from "axios";
import { Redirect,useParams} from 'react-router-dom';

const ShowProject= (props)=>{
    const [pDescription,setPdescription]=useState("");
    const [estado, setEstado]=useState(0);
    const [moduleAddName,setModuleName]=useState("");
    const [moduleAddDesc,setModuleDesc]=useState("");
    const [reqAddName,setReqName]=useState("");
    const [reqAddDesc,setReqDesc]=useState("");
    const [modules, setModules]=useState([]);
    const [moduleId, setModuleId]=useState([]);
    const [pName,setPname]=useState("");
    const [cNameGet,setCnameGet]=useState("");
    const [cName,setCname]=useState("");
    const [showR, setShowR] = useState(false);
    const [showC, setShowC] = useState(false);
    const [showMM, setShowMM] = useState(false);
    const [showM, setShowM] = useState(false);
    const [requirements, setRequirements] = useState([]);
    let { id } = useParams();
    useEffect(() => {
        axios.get("http://localhost:8080/projects/"+id
        ).then(response => {
          setPdescription(response.data.descriptionProject);
          setPname(response.data.nameProject);
          setCnameGet(response.data.client);
          axios.get("http://localhost:8080/requirements/allFromProject",
          {
              params:{
                  projectId:id
              }
        }).then(response => {
            setRequirements(response.data);
        });
         

        axios.get("http://localhost:8080/modules/allFromProject",
        {
            params:{
                projectId:id
            }
      }).then(response => {
          setModules(response.data);
      });


        });
      }, []);
      const handleCloseR = () => {setShowR(false);};
      const handleShowR = () => {setShowR(true);};
      const handleCloseM = () =>{ setShowM(false);};
      const handleShowM = () => {setShowM(true);};
      const handleShowCli = () => {setShowC(true);};
      const handleCloseCli = () => {setShowC(false);};
      const handleShowModM = (e) => {
        e.stopPropagation();
        let idObj = e.target.dataset;
        setModuleId(idObj.test);
        setShowMM(true);};
      const handleCloseModM = () => {setShowMM(false);};
      const onChangeNameModule = (e) => {
        const name = e.target.value;
        setModuleName(name);
      };
      const onChangeNameDesc = (e) => {
        const desc = e.target.value;
        setModuleDesc(desc);
      };
      const onChangeNameClient = (e) => {
        const client = e.target.value;
        setCname(client);
      };
      //nombre
      const onChangeNameReq= (e) => {
        const name = e.target.value;
        setReqName(name);
      };
      //descripcion
      const onChangeDescReq = (e) => {
        const desc = e.target.value;
        setReqDesc(desc);
      };
    const handleAddModule = (e)=>{
        axios.post("http://localhost:8080/modules/create",{
            moduleName: moduleAddName,
            descriptionModule: moduleAddDesc,
            projectId: id
        }
        ).then( ()=>{window.location.reload();} )
    }
    const handleAddReq = (e)=>{
        axios.post("http://localhost:8080/requirements/create",{
            requirementName: reqAddName,
            requirementDescription: reqAddDesc,
            idProject: id
        }
        ).then( ()=>{window.location.reload();} )
    }
    const handleAddClient = (e)=>{
      axios.post("http://localhost:8080/projects/AssignClient",{
          email: cName,
          idProject: id
      }
      ).then( ()=>{
        window.location.reload();} )
  }
  const handleDeleteModule=(e)=>{
    e.stopPropagation();
    let idObj = e.target.dataset;
    console.log(idObj.test);
    axios.post("http://localhost:8080/modules/delete",{
        id:parseInt(idObj.test)
      }
  ).then( ()=>{window.location.reload();} )
  }
  const handleUpdateModule=(e)=>{
    console.log(moduleId);
    axios.post("http://localhost:8080/modules/update",{
      nameModule:moduleAddName,
      descriptionModule:moduleAddDesc,
      idM: moduleId,
      projectId: id
    }).then(()=>window.location.reload())
  }
  const handleDeleteReq=()=>{


  }
  const handleUpdateReq=()=>{

    
  }
return(
    <div>
    <h4>Projecto</h4>
    <div>
      <label>
        <strong>Titulo</strong>
      </label>{" "}
      {pName}
    </div>
    <div>
      <label>
        <strong>Descripcion</strong>
      </label>{" "}
      {pDescription}
    </div>
    <div>
      <label>
        <strong>Nombre Cliente: </strong>
      </label>{" "}
      {cNameGet ? cNameGet.nombre :"no asignado" }
    </div>
    <div>
      <label>
        <strong>Apellido Cliente: </strong>
      </label>{" "}
      {cNameGet? cNameGet.apellido :"no asignado" }
    </div>
    <Button variant="primary" onClick={handleShowCli}>Añadir cliente</Button>
    
    <Modal show={showC} onHide={handleCloseCli}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="name" onChange={onChangeNameClient} />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseCli}>
            Cancelar
          </Button>
          <Button variant="primary"  onClick={handleAddClient}>
            Ingresar
          </Button>
        </Modal.Footer>
      </Modal>






    <Row>
    <Modal show={showR} onHide={handleCloseR}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir modulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre Requerimiento</Form.Label>
                <Form.Control type="name" onChange={onChangeNameReq} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control as="textarea" onChange={onChangeDescReq} />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseR}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddReq}>
            Ingresar
          </Button>
        </Modal.Footer>
      </Modal>

    <Col>
    <h3>Requerimiento</h3>
    <Button variant="primary" onClick={handleShowR}>Añadir Requerimiento</Button>
    <ListGroup>
    {requirements.map((item,index)=> <ListGroup.Item key={index}>
    <Accordion>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    {item.nameRequirement}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>
                  { item.descriptionRequirement}
                  <Button variant="secondary"  data-Test={item.id} onClick={handleUpdateReq(item.id)}>
                    Actualizar
                  </Button>
                <Button variant="danger"  data-Test={item.id} onClick={handleDeleteReq(item.id)}>
                    Eliminar
                  </Button>
                </Card.Body>
            </Accordion.Collapse>
    </Accordion>

    </ListGroup.Item> )}
    </ListGroup>
    </Col>

    <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir modulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre modulo</Form.Label>
                <Form.Control type="name" onChange={onChangeNameModule} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control as="textarea" onChange={onChangeNameDesc} />
            </Form.Group>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseM}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddModule}>
            Ingresar
          </Button>
        </Modal.Footer>
      </Modal>
    <Col>
    <h3>Modulos</h3>
    <Button variant="primary" onClick={handleShowM}>Añadir modulo</Button>
    <ListGroup>
    {modules.map((item,index)=> <ListGroup.Item key={index}>
    <Accordion>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    {item.nameModule}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>{ item.descriptionModule}
                <Button variant="secondary"  data-Test={item.id} onClick={handleShowModM}>
                    Actualizar
                  </Button>
                <Button variant="danger" data-Test={item.id} onClick={handleDeleteModule}>
                    Eliminar
                  </Button>
                </Card.Body>
            </Accordion.Collapse>
    </Accordion>

    <Modal show={showMM} onHide={handleCloseModM}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar modulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre modulo</Form.Label>
                <Form.Control type="name" onChange={onChangeNameModule} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control as="textarea" onChange={onChangeNameDesc} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModM}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateModule}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </ListGroup.Item> )}
    </ListGroup>
    </Col>
  </Row>


    </div>
)
}
export default ShowProject;