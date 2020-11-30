import React from "react";

const NoCotizadosModulos=()=>{

    const [modulos, setModulos] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8080/mo/",
        {
            headers:
            {
                'token':localStorage.getItem('token')
            }
        }
        ).then(response => {
          setEmail(response.data.email);
          setNombre(response.data.nombre);
          setApellido(response.data.apellido);
          setTelefono(response.data.telefono);
          setLoading(false);
        });
      }, []);
    return(
        <h1></h1>
    )
}