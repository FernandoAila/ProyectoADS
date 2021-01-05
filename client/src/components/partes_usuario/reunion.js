import React, { Fragment, useState ,useEffect} from "react";
import axios from "axios";
import DevReu from "./devReu.js";
import { OverlayTrigger, Tooltip, Dropdown, DropdownButton, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
const Reunion = (props) => {
    const [reunionsDev, setDevReunions] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:8080/reunionsRoutes/ReunionsDev", {
            params: {
                idReu: props.reunion.id
            }
        }
        ).then(response => {
            setDevReunions(response.reunion);
        });
    }, []);

    return (
        <Card className="card-task">
            <div className="card-body">
                <div className="card-title">
                    <h6 className="titlecard">{props.reunion.Date}</h6>
                </div>
                <div className="card-meta">
                    <div className="d-flex align-items-center">
                        <ul className="avatars">
                            {reunionsDev.map( (devReu,index) => (
                                <DevReu devReuv={devReu} key={index} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default Reunion;