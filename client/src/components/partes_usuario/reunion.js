import React, { Fragment, useState ,useEffect} from "react";
import axios from "axios";
import DevReu from "./devReu.js";
import { OverlayTrigger, Tooltip, Dropdown, DropdownButton, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
const Reunion = (props) => {
    const [reunionsDev, setDevReunions] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:8080/reunionsRoutes/ReunionsDev", {
            params: {
                IdReu: props.reunions.id
            }
        }
        ).then(response => {
            setDevReunions(response.data);
            console.log(reunionsDev)
        });
    }, []);
    return (
        <Card className="card-task">
            <div className="card-body">
                <div className="card-title">
                    <h6>{props.reunions.Title}</h6>
                    <a href={props.reunions.Link}>{props.reunions.Link}</a>
                    <h6 className="titlecard">{props.reunions.Date}{" "}{props.reunions.Hour}:{props.reunions.Minute<10?"0"+props.reunions.Minute:props.reunions.Minute}</h6>
                </div>
                <div className="card-meta">
                    <div className="d-flex align-items-center">
                        <ul className="avatars">
                            {reunionsDev.map( (reunionsDev,index) => (
                                <DevReu reunionsDev={reunionsDev} key={index} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default Reunion;