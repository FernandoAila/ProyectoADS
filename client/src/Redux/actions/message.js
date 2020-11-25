import {CLEAR_MESSAGE, SET_MESSAGE } from "./types"

//Maneja los mensajes del backend
export const setMessage = (message) =>({
    type: SET_MESSAGE,
    payload:message,
});
export const clearMessage = ()=>({
    type:CLEAR_MESSAGE,
})