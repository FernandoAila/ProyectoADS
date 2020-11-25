import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    REDIRECT,
  } from "../actions/types";
  /*Actualiza el estado de isLoggedIn, variable que nos dice si el usuario esta logeado, junto con el estado del
  usuario
*/

  const initialState ={isLogged: localStorage.getItem('token') ? true : false,}
  
const authReducer= (state = initialState, action)=> {
    const { type, payload } = action;
  
    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          ...payload,
        };
      case REGISTER_FAIL:
        return {
          ...state,
          ...payload,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
        };
      case LOGIN_FAIL:
        return {
          ...state,
          ...payload,
        };
      case LOGOUT:
        return {
          ...state,
          ...payload,
        };
      case REDIRECT:
          return { redirectTo: action.payload };
      default:
        return state;
    }
  }
  export default authReducer;