import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth";


export default function PrivateRoutes(){
    const {user}  = useAuth();
    return<div>
        {user ? <Outlet/> : <Navigate to= "/"/> }
    </div>

}