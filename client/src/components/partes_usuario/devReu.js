import React, { Fragment, useState ,useEffect} from "react";
import axios from "axios";
import { OverlayTrigger, Tooltip, Dropdown, DropdownButton, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
const DevReu = (props) => {
    const [devs, setDevs] = useState([]);

    useEffect(() => {
    axios.get("http://localhost:8080/users/profileinfo", {
            params: {
                id: props.reunionsDev.IdUser
            }
        }
        ).then(response => {
            setDevs(response.data);
        });
    }, []);


    return (    
        <li>
            <OverlayTrigger overlay={<Tooltip id="button-tooltip-2">{devs.nombre+" "+devs.apellido}</Tooltip>}>
            <img alt={devs.nombre+" "+devs.apellido} className="avatar"
            src={devs.profilePic}></img>
            </OverlayTrigger>
        </li>
    )
}
export default DevReu;