import {SET_MESSAGE, CLEAR_MESSAGE} from "../actions/types"
// Actualiza el estado de los mensajes cuando este es enviado desde cualquier parte de la aplicacion
const initialState={};
export default function(state=initialState,accion){
    const{type,payload}=action;
    switch (type) {
        case SET_MESSAGE:
            return{ message:payload};
        case CLEAR_MESSAGE:
            return{message:""};
        default:
            return state;
    }
}