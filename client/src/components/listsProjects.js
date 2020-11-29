import React, { useState, useRef,useEffect} from "react";
import { login} from "../Redux/actions/auth";
import {Table,Button} from "react-bootstrap"
import { useSelector, useDispatch} from "react-redux";
import Project from "./projects";
const ListsProjects= (props)=>{

    const isLogged = useSelector((store) => store.authReducer.isLogged);


    return(
        <div>
            <div class="card-header">
                <h5>Projectos</h5>
            </div>
            <div className="card-block px-0 py-3">
                <div className="table-responsive">
                    <Table>
                        <tbody>
                            <Project/>
                            <Project/>
                            <Project/>
                            <Project/>
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
export default ListsProjects;