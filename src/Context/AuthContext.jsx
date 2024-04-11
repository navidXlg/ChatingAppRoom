import { createContext, useEffect, useState} from "react";
import { account } from "../appWriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
import { quantum } from 'ldrs'
quantum.register()

export const authContext = createContext();
export default function ContextProvider({children}){

    const [user, setUser] = useState(null);
    const [model, setModel] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingRequest, setLoadingReguest] = useState(false);
    const [logInError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        userOnload();
    },[]);

    const handelLoginSubmit = async(event, creadintial) => {
        event.preventDefault();
        setLoadingReguest("")
        let {email, password} = creadintial;
        setLoadingReguest(true);
        try{
            await account.createEmailSession(email, password);
            const acc = await account.get();
            setUser(acc);
            setLoadingReguest(false);
            navigate("/room");
        }
        catch(error){
            setLoadingReguest(false);
            setLoginError(error.message);

        }

    };

    const userRegister = async(event, credintial) => {

        event.preventDefault();
        setRegisterError("");
        let {email, name, password, passwordConifrm} = credintial;
        if(passwordConifrm !== password) {
            setRegisterError("The passwords does not match");
            return;
        } 
        setLoadingReguest(true);

        try{
            await account.create(ID.unique(), email, password, name);
            await account.createEmailSession(email, password);
            const activeAccount = await account.get();
            setUser(activeAccount);
            // navigate("/room");
            setLoadingReguest(false);
            setModel(true)
        }
        catch(error){
            setRegisterError(error.message);
            setLoadingReguest(false);
        }
    };

    const userOnload = async() => {

        try{
            const sessionON = await account.get();  
            setUser(sessionON);
            setLoading(false)        
        }catch(error){
            console.log(error)
            setLoading(false)
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
        userRegister,
        loadingRequest,
        logInError,
        registerError,
        model,
        setModel
    };

    return <authContext.Provider value={contextState}>
                {
                loading ?
                <div className="h-screen bg-slate-700 flex justify-center items-center">
                <l-quantum
                size="80"
                speed="1.81" 
                color="white" 
                ></l-quantum> 
                </div> 
                :children }
           </authContext.Provider>
    
    }



