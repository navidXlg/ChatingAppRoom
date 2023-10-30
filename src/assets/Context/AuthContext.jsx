
import { createContext, useEffect, useState} from "react";
import { account } from "../../appWriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";

export const authContext = createContext();

export default function ContextProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        userOnload();
    },[]);

    const handelLoginSubmit = async(event, creadintial) => {
        event.preventDefault()
        let {email, password} = creadintial;
        try{
            await account.createEmailSession(email, password);
            const acc = await account.get()
            setUser(acc);
            navigate("/room");
        }
        catch(error){
            console.log(error);
        }
    };

    const userRegister = async(event, credintial) => {

        event.preventDefault();
        let {email, name, password, passwordConifrm} = credintial;
        if(passwordConifrm !== password) return alert("The passwords does not match");

        try{
            const response = await account.create(ID.unique(), email, password, name);
            await account.createEmailSession(email, password);
            navigate("/room");
            console.log(response);
        }
        catch(error){
            console.log(error)
        }
    };

    const userOnload = async() => {

        try{
            const sessionON = await account.get();  
            setUser(sessionON);
            setLoading(false)        
        }catch(error){
            console.log(error)
        }
    };

    const deleteSession = async() => {
        try{
            await account.deleteSession('current');
            setUser(null);
            console.log("session deleted");
        }
        catch(error){
            console.log(error)
            console.log("session not deleted")
        }
    };



    const contextState = {
        user,
        handelLoginSubmit,
        deleteSession,
        userRegister
    };


    return <authContext.Provider value={contextState}>
                {loading ? <div>... Loading!!!</div> : children }
           </authContext.Provider>
};


