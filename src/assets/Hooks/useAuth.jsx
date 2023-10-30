import { useContext } from "react";
import { authContext } from "../Context/AuthContext";


export function useAuth(){
    return useContext(authContext)
}