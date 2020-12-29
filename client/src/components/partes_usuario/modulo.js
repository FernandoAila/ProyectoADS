import React, { Fragment, useState ,useEffect} from "react";
import { OverlayTrigger, Tooltip, Dropdown, DropdownButton, Card, Form, Button, Row, Col, Modal } from "react-bootstrap";
const Modulo = (props) => {
    return (
        <Card className="card-task">
            <div className="card-body">
                <div className="card-title">
                    <h6 className="titlecard">{props.data.nameModule}</h6>
                    <span className="text-small">{props.data.descriptionModule}</span>
                </div>
                <div className="card-meta">
                    <div className="d-flex align-items-center">
                        <ul className="avatars">
                            
                            <li>
                                    <OverlayTrigger overlay={<Tooltip id="button-tooltip-2">{props.datadev.nombre+" "+props.datadev.apellido}</Tooltip>}>
                                        <img alt={props.datadev.nombre+" "+props.datadev.apellido} className="avatar"
                                            src={props.datadev.profilePic}></img>
                                    </OverlayTrigger>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Card>

    )
}
export default Modulo;