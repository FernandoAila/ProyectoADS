import React, { Fragment, useState ,useEffect} from "react";
import axios from "axios";
import { OverlayTrigger, Tooltip, Dropdown, DropdownButton, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
const DevReu = (props) => {
        const user = axios.get("http://localhost:8080/users/profileinfo", {
                params: {
                    id: props.devReu.id
                }
            }
            ).then(response => {
        });


    return (    
        <li>
            <OverlayTrigger overlay={<Tooltip id="button-tooltip-2">{user.nombre+" "+user.apellido}</Tooltip>}>
            <img alt={user.nombre+" "+user.apellido} className="avatar"
            src={user.profilePic}></img>
            </OverlayTrigger>
        </li>
    )
}
export default DevReu;