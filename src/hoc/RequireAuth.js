import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const RequireAuth = ({children}) =>{
    const location = useLocation();
    const {user} = useAuth();

    console.log(location)
    console.log(user)
    if(user === null){
        return <Navigate to="/login" />
    }else if(user.role == "ADMIN_ROLE"){
        
    }

    return children;
}

export {RequireAuth}