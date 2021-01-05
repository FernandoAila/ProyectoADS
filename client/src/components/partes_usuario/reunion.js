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
        });
    }, []);
    var minute;
    if (props.reunions.Minute < 10) {
        minute="0"+props.reunions.Minute
    }
    else{
        minute=props.reunions.Minute
    }
    return (
        <Card className="card-task">
            <div className="card-body">
                <div className="card-title">
                    <h6 className="titlecard">{props.reunions.Date}{" "}{props.reunions.Hour}:{minute}</h6>
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