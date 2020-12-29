import {LOGOUT,LOGIN_SUCCESS} from "./types"

export const login=(data)=>{
  return{
    type:LOGIN_SUCCESS,
    payload:{IsLogged:true,},
  }
}
export const logout=()=>{
  //Esto es malo, pero no me importa
  localStorage.removeItem('token');
  localStorage.removeItem('profilePic');
  localStorage.removeItem('UserId');
  return{
    type:LOGOUT,
    payload:{IsLogged:false},
  }
}