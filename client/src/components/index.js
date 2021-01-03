import { Redirect} from 'react-router-dom';
import {useSelector} from "react-redux";

const Index=()=>{
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    if(isLogged){
        return <Redirect to={"/user/"+localStorage.getItem("userId")}   />;
    }
    return <Redirect to="/login"   />;
}

export default Index