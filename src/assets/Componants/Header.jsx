import { useAuth } from "../Hooks/useAuth"


export default function Header(){

    const {user, deleteSession} = useAuth();
    return <>
                <p>Welcome {user.name}</p>
                <button onClick={deleteSession}>Log Out</button>
           </>
}