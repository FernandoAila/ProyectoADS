import React, { useState, useRef,useEffect} from "react";
import { Card,InputGroup,FormControl,Form,Button} from "react-bootstrap";
import axios from "axios";
import { Redirect} from 'react-router-dom';
const AddProyect= (props)=>{

    const [pDescription,setPdescription]=useState("");
    const [estado, setEstado]=useState(0);
    const [pName,setPname]=useState("");
    const blankReq = { name: '', desc: '' };

    const [requeriments, setRequirements] = useState([
        {...blankReq}
      ]);
    const handleReqChange = (e) => {
        e.preventDefault();
        const updatedReqs = [...requeriments];
        updatedReqs[e.target.dataset.idx][e.target.name] = e.target.value;
        setRequirements(updatedReqs);
    };
    const onChangeName = (e) => {
        const name = e.target.value;
        setPname(name);
      };

    const onChangeDesc = (e) => {
        const desc = e.target.value;
        setPdescription(desc);
    };

    const addReq = () => {
        setRequirements([...requeriments, {...blankReq}]);
      };
    const handleEnviar =()=>{
        axios.post('http://localhost:8080/projects/create', {
        nameProject: pName,
        descriptionProject: pDescription,
        requeriments:requeriments
      }).then((data) => {
        console.log(data);
        setEstado(data.data.id);
        //dispatch(redirect("/perfil"));
      }).catch((err)=>{
        console.log(err);
      });

    }

    return(
        
        <Card style={{ width: '40rem' }} className="text-center">
            {estado =! 0 ? <Redirect to={"/projects/"+estado} /> : null}
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Nombre de proyecto</Form.Label>
                <Form.Control type="text" placeholder="Nombre" onChange={onChangeName}/>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Descripcion</Form.Label>
                <FormControl as="textarea" aria-label="With textarea" onChange={onChangeDesc} />
            </Form.Group>
            <Button variant="primary" onClick={addReq}>Añadir requerimiento</Button>
            {
        requeriments.map((val, idx) => {
          const reqId = `name-${idx}`;
          const descId = `desc-${idx}`;
          return (
            <div key={`Req-${idx}`}>
              <Form.Label htmlFor={reqId}>{`Requerimiento #${idx + 1}`}</Form.Label>
              <FormControl
                type="text"
                name="name"
                data-idx={idx}
                id={reqId}
                onChange={handleReqChange}
                //value={ requeriments[idx].name}
                className="name" 
              /><br></br>
              <Form.Label htmlFor={descId}>Descripcion</Form.Label>
                <FormControl
                      type="textarea"
                      name="desc"
                      data-idx={idx}
                      id={descId}
                      //value={requeriments[idx].desc}
                      onChange={handleReqChange}
                      className="desc"
                    />
            </div>
          );      
        })
      }
    <Button variant="primary" onClick={handleEnviar}>Añadir requerimiento</Button>
        </Card>
    );
}
export default AddProyect;