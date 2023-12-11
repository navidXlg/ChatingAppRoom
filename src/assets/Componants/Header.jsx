import { useAuth } from "../Hooks/useAuth";
import { CiLogout } from "react-icons/ci";


export default function Header(){

    const {user, deleteSession} = useAuth();
    return <section className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-4 ml-5">
                    <span className="bg-slate-800 text-white inline-block rounded-full px-2 py-2">{
                        user.name.split("").slice(0,2).join("").toUpperCase()
                          }
                    </span>
                    <h3>{user.name}</h3>
                </div>
                <button onClick={deleteSession} className="mr-5 text-3xl font-extrabold hover:text-slate-800">
                <CiLogout />
                </button>
           </section>
};

