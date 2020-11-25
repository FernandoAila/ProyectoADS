import React, { useState, useRef} from "react";

const Register=(props)=>{
    const form = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeNombre = (e) => {
        const nombre = e.target.value;
        setNombre(nombre);
    };

    const onChangeApellido = (e) => {
        const apellido = e.target.value;
        setApellido(apellido);
    };

    const onChangeTelefono = (e) => {
        const telefono = e.target.value;
        setTelefono(telefono);
    };


}

export default Register;